const { TRIP_MODES, TRIP_STATUS, PASSENGER_FEE } = require('../constants/business');
const { findLocationById } = require('../constants/locations');
const { mockUsers } = require('./users');

const mockTrips = [
  {
    tripId: 'trip_001',
    type: TRIP_MODES.RIDE,
    status: TRIP_STATUS.OPEN,
    driverId: 'user_driver_001',
    fromPlace: 'fl_100modern',
    fromGroup: 'fortLee',
    toPlace: 'cu_main',
    toGroup: 'columbia',
    departureTime: '2026-04-15T08:30:00.000Z',
    estimatedArrival: '2026-04-15T09:10:00.000Z',
    totalSeats: 4,
    passengers: [
      {
        userId: 'user_rider_001',
        status: 'confirmed',
        joinedAt: '2026-04-14T21:30:00.000Z',
        paymentMethod: 'zelle'
      },
      {
        userId: 'user_rider_002',
        status: 'pending',
        joinedAt: '2026-04-14T22:00:00.000Z',
        paymentMethod: 'venmo'
      }
    ],
    pricePerPerson: PASSENGER_FEE,
    carModel: 'Tesla Model 3',
    licensePlate: 'NJ • ABC 1234',
    createdAt: '2026-04-14T20:00:00.000Z',
    updatedAt: '2026-04-14T22:00:00.000Z'
  },
  {
    tripId: 'trip_002',
    type: TRIP_MODES.UBER,
    status: TRIP_STATUS.OPEN,
    driverId: 'user_rider_001',
    fromPlace: 'fl_hudsonlight',
    fromGroup: 'fortLee',
    toPlace: 'cu_business',
    toGroup: 'columbia',
    departureTime: '2026-04-15T18:20:00.000Z',
    estimatedArrival: '2026-04-15T18:55:00.000Z',
    totalSeats: 4,
    passengers: [
      {
        userId: 'user_rider_002',
        status: 'confirmed',
        joinedAt: '2026-04-15T12:10:00.000Z',
        paymentMethod: 'venmo'
      }
    ],
    pricePerPerson: 13,
    carModel: '',
    licensePlate: '',
    createdAt: '2026-04-15T10:30:00.000Z',
    updatedAt: '2026-04-15T12:10:00.000Z'
  },
  {
    tripId: 'trip_003',
    type: TRIP_MODES.RIDE,
    status: TRIP_STATUS.COMPLETED,
    driverId: 'user_driver_001',
    fromPlace: 'cu_medical',
    fromGroup: 'columbia',
    toPlace: 'fl_downtown',
    toGroup: 'fortLee',
    departureTime: '2026-04-13T19:00:00.000Z',
    estimatedArrival: '2026-04-13T19:35:00.000Z',
    totalSeats: 4,
    passengers: [
      {
        userId: 'user_rider_001',
        status: 'confirmed',
        joinedAt: '2026-04-13T17:30:00.000Z',
        paymentMethod: 'zelle'
      }
    ],
    pricePerPerson: PASSENGER_FEE,
    carModel: 'Tesla Model 3',
    licensePlate: 'NJ • ABC 1234',
    createdAt: '2026-04-13T15:00:00.000Z',
    updatedAt: '2026-04-13T20:00:00.000Z'
  }
];

const enrichTrip = (trip) => {
  const driver = mockUsers.find((user) => user.userId === trip.driverId) || null;
  const from = findLocationById(trip.fromPlace);
  const to = findLocationById(trip.toPlace);
  const passengers = trip.passengers.map((passenger) => ({
    ...passenger,
    user: mockUsers.find((user) => user.userId === passenger.userId) || null
  }));

  const occupiedSeats = passengers.filter((passenger) => passenger.status !== 'cancelled').length;
  const availableSeats = Math.max(trip.totalSeats - occupiedSeats, 0);

  return {
    ...trip,
    driver,
    from,
    to,
    passengers,
    occupiedSeats,
    availableSeats,
    emptySeatItems: Array.from({ length: availableSeats }, (_, index) => ({ key: index }))
  };
};

const getTripsByType = (type) => mockTrips.filter((trip) => !type || trip.type === type).map(enrichTrip);
const getTripById = (tripId) => {
  const trip = mockTrips.find((item) => item.tripId === tripId);
  return trip ? enrichTrip(trip) : null;
};

module.exports = {
  mockTrips,
  enrichTrip,
  getTripsByType,
  getTripById
};