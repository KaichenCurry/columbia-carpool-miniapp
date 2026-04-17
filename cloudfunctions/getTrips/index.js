const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  usersRepo,
  mapper,
  ok,
  business
} = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  const filter = {};
  if (event.type && [business.TRIP_MODES.RIDE, business.TRIP_MODES.UBER].includes(event.type)) {
    filter.type = event.type;
  }
  filter.status = db.command.in([business.TRIP_STATUS.OPEN, business.TRIP_STATUS.FULL, business.TRIP_STATUS.DEPARTED, business.TRIP_STATUS.COMPLETED, business.TRIP_STATUS.CANCELLED]);

  const trips = await tripsRepo.listTrips(db, filter);
  const userIds = trips.flatMap((trip) => [trip.driverId, ...(trip.passengers || []).map((passenger) => passenger.userId)]).filter(Boolean);
  const users = await usersRepo.findUsersByIds(db, userIds);

  return ok({
    trips: trips.map((trip) => mapper.mapTrip(trip, users))
  });
};