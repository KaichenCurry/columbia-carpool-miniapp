const { COLLECTIONS } = require('./collections');

const listTrips = async (db, filter = {}) => {
  let query = db.collection(COLLECTIONS.TRIPS);

  if (Object.keys(filter).length) {
    query = query.where(filter);
  }

  const result = await query.orderBy('departureTime', 'asc').get();
  return result.data || [];
};

const findTripById = async (db, tripId) => {
  const result = await db.collection(COLLECTIONS.TRIPS).where({ tripId }).limit(1).get();
  return result.data[0] || null;
};

const createTrip = async (db, trip) => {
  return db.collection(COLLECTIONS.TRIPS).add({ data: trip });
};

const updateTripById = async (db, tripId, data) => {
  return db.collection(COLLECTIONS.TRIPS).where({ tripId }).update({ data });
};

module.exports = {
  listTrips,
  findTripById,
  createTrip,
  updateTripById
};