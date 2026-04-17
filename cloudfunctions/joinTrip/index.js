const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  usersRepo,
  auth,
  validators,
  ok,
  fail,
  mapper,
  business
} = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  if (!event.tripId) {
    return fail('缺少 tripId', 'MISSING_TRIP_ID');
  }

  const validationErrors = validators.validateJoinTrip(event);
  if (validationErrors.length) {
    return fail('加入行程参数不合法', 'INVALID_JOIN_TRIP', { errors: validationErrors });
  }

  const { openId, user } = await auth.getCurrentUser(db);
  if (!user) {
    return fail('用户不存在', 'USER_NOT_FOUND', { openId });
  }

  const trip = await tripsRepo.findTripById(db, event.tripId);
  if (!trip) {
    return fail('未找到行程', 'TRIP_NOT_FOUND');
  }

  if (trip.driverOpenId === openId) {
    return fail('不能加入自己发起的行程', 'JOIN_OWN_TRIP');
  }

  if ([business.TRIP_STATUS.CANCELLED, business.TRIP_STATUS.DEPARTED, business.TRIP_STATUS.COMPLETED].includes(trip.status)) {
    return fail('当前行程不可加入', 'TRIP_NOT_JOINABLE');
  }

  const alreadyJoined = (trip.passengers || []).some((passenger) => passenger.userOpenId === openId && passenger.status !== business.PARTICIPANT_STATUS.CANCELLED);
  if (alreadyJoined) {
    return fail('你已经加入过该行程', 'ALREADY_JOINED');
  }

  const occupiedSeats = (trip.passengers || []).filter((passenger) => passenger.status !== business.PARTICIPANT_STATUS.CANCELLED).length;
  if (occupiedSeats >= Number(trip.totalSeats)) {
    return fail('行程已满员', 'TRIP_FULL');
  }

  const nextPassengers = [
    ...(trip.passengers || []),
    {
      userId: user.userId,
      userOpenId: openId,
      status: business.PARTICIPANT_STATUS.CONFIRMED,
      joinedAt: new Date(),
      paymentMethod: event.paymentMethod
    }
  ];

  const nextStatus = nextPassengers.filter((passenger) => passenger.status !== business.PARTICIPANT_STATUS.CANCELLED).length >= Number(trip.totalSeats)
    ? business.TRIP_STATUS.FULL
    : trip.status;

  await tripsRepo.updateTripById(db, event.tripId, {
    passengers: nextPassengers,
    status: nextStatus,
    updatedAt: new Date()
  });

  const updatedTrip = await tripsRepo.findTripById(db, event.tripId);
  const users = await usersRepo.findUsersByIds(db, [updatedTrip.driverId, ...nextPassengers.map((passenger) => passenger.userId)]);

  return ok({
    tripId: event.tripId,
    paymentMethod: event.paymentMethod,
    trip: mapper.mapTrip(updatedTrip, users)
  });
};