const { findLocationById } = require('../constants/locations');
const { PARTICIPANT_STATUS } = require('../constants/business');

const mapTrip = (trip, users = []) => {
  if (!trip) {
    return null;
  }

  const driver = users.find((user) => user.userId === trip.driverId) || null;
  const passengers = (trip.passengers || []).map((passenger) => ({
    ...passenger,
    user: users.find((user) => user.userId === passenger.userId) || null
  }));
  const occupiedSeats = passengers.filter((passenger) => passenger.status !== PARTICIPANT_STATUS.CANCELLED).length;
  const availableSeats = Math.max(Number(trip.totalSeats || 0) - occupiedSeats, 0);

  return {
    ...trip,
    driver,
    from: findLocationById(trip.fromPlace),
    to: findLocationById(trip.toPlace),
    passengers,
    occupiedSeats,
    availableSeats,
    emptySeatItems: Array.from({ length: availableSeats }, (_, index) => ({ key: index }))
  };
};

module.exports = {
  mapTrip
};