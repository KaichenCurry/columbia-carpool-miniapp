const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  usersRepo,
  auth,
  validators,
  ok,
  fail,
  business
} = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  const errors = validators.validateCreateTrip(event);
  if (errors.length) {
    return fail('创建行程参数不合法', 'INVALID_CREATE_TRIP', { errors });
  }

  const { openId, user } = await auth.getCurrentUser(db);
  if (!user) {
    return fail('用户不存在', 'USER_NOT_FOUND', { openId });
  }

  const now = new Date();
  const tripId = `trip_${Date.now()}`;
  const fromPlaceId = validators.normalizePlaceId(event.fromGroupKey, event.fromPlace || event.fromLabel);
  const toPlaceId = validators.normalizePlaceId(event.toGroupKey, event.toPlace || event.toLabel);
  const departureTime = event.departureTime || now.toISOString();
  const estimatedArrival = event.estimatedArrival || new Date(new Date(departureTime).getTime() + 40 * 60 * 1000).toISOString();

  const trip = {
    tripId,
    type: event.mode,
    status: business.TRIP_STATUS.OPEN,
    driverId: user.userId,
    driverOpenId: openId,
    fromPlace: fromPlaceId,
    fromGroup: event.fromGroupKey,
    toPlace: toPlaceId,
    toGroup: event.toGroupKey,
    departureTime,
    estimatedArrival,
    totalSeats: Number(event.seatCount),
    passengers: [],
    pricePerPerson: business.PASSENGER_FEE,
    createdAt: now,
    updatedAt: now
  };

  await tripsRepo.createTrip(db, trip);

  return ok({
    tripId,
    payload: trip
  });
};