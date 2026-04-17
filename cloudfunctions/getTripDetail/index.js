const cloud = require('wx-server-sdk');
const { tripsRepo, usersRepo, mapper, ok, fail } = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  if (!event.tripId) {
    return fail('缺少 tripId', 'MISSING_TRIP_ID');
  }

  const trip = await tripsRepo.findTripById(db, event.tripId);
  if (!trip) {
    return fail('未找到行程', 'TRIP_NOT_FOUND');
  }

  const userIds = [trip.driverId, ...(trip.passengers || []).map((passenger) => passenger.userId)].filter(Boolean);
  const users = await usersRepo.findUsersByIds(db, userIds);

  return ok({
    trip: mapper.mapTrip(trip, users)
  });
};