const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  usersRepo,
  auth,
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

  const { openId } = await auth.getCurrentUser(db);
  const trip = await tripsRepo.findTripById(db, event.tripId);
  if (!trip) {
    return fail('未找到行程', 'TRIP_NOT_FOUND');
  }

  const target = (trip.passengers || []).find((passenger) => passenger.userOpenId === openId && passenger.status !== business.PARTICIPANT_STATUS.CANCELLED);
  if (!target) {
    return fail('你不在该行程中', 'PASSENGER_NOT_FOUND');
  }

  const nextPassengers = (trip.passengers || []).map((passenger) => {
    if (passenger.userOpenId !== openId) {
      return passenger;
    }

    return {
      ...passenger,
      status: business.PARTICIPANT_STATUS.CANCELLED,
      leftAt: new Date()
    };
  });

  await tripsRepo.updateTripById(db, event.tripId, {
    passengers: nextPassengers,
    status: business.TRIP_STATUS.OPEN,
    updatedAt: new Date()
  });

  const updatedTrip = await tripsRepo.findTripById(db, event.tripId);
  const users = await usersRepo.findUsersByIds(db, [updatedTrip.driverId, ...nextPassengers.map((passenger) => passenger.userId)]);

  return ok({
    tripId: event.tripId,
    trip: mapper.mapTrip(updatedTrip, users)
  });
};