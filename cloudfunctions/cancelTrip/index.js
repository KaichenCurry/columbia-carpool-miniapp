const cloud = require('wx-server-sdk');
const { tripsRepo, auth, ok, fail, business } = require('../common/src');

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

  if (trip.driverOpenId !== openId) {
    return fail('只有发起人可以取消行程', 'NOT_TRIP_OWNER');
  }

  await tripsRepo.updateTripById(db, event.tripId, {
    status: business.TRIP_STATUS.CANCELLED,
    updatedAt: new Date(),
    cancelledAt: new Date()
  });

  return ok({
    tripId: event.tripId,
    status: business.TRIP_STATUS.CANCELLED
  });
};