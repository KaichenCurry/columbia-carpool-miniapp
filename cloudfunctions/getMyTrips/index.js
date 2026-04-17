const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  usersRepo,
  mapper,
  auth,
  ok,
  fail,
  business
} = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async () => {
  const { openId, user } = await auth.getCurrentUser(db);
  if (!user) {
    return fail('用户不存在', 'USER_NOT_FOUND', { openId });
  }

  const trips = await tripsRepo.listTrips(db);
  const myTrips = trips.filter((trip) => trip.driverOpenId === openId || (trip.passengers || []).some((passenger) => passenger.userOpenId === openId));
  const userIds = myTrips.flatMap((trip) => [trip.driverId, ...(trip.passengers || []).map((passenger) => passenger.userId)]).filter(Boolean);
  const users = await usersRepo.findUsersByIds(db, userIds);

  const mappedTrips = myTrips.map((trip) => mapper.mapTrip(trip, users));

  return ok({
    profile: user,
    activeTrips: mappedTrips.filter((trip) => [business.TRIP_STATUS.OPEN, business.TRIP_STATUS.FULL, business.TRIP_STATUS.DEPARTED].includes(trip.status)),
    historyTrips: mappedTrips.filter((trip) => [business.TRIP_STATUS.COMPLETED, business.TRIP_STATUS.CANCELLED].includes(trip.status))
  });
};