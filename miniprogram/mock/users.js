const mockUsers = [
  {
    userId: 'user_driver_001',
    openId: 'mock_openid_driver_001',
    nickName: 'Alex Chen',
    avatarUrl: 'https://dummyimage.com/120x120/1D4F91/ffffff&text=A',
    phone: '',
    cuVerified: true,
    cuEmail: 'alex@columbia.edu',
    rating: 4.9,
    totalTrips: 86,
    totalSaved: 286,
    department: 'SIPA',
    paymentMethods: ['zelle', 'venmo'],
    zelleAccount: 'alex@zelle.test',
    venmoAccount: '@alex-chen',
    carModel: 'Tesla Model 3',
    licensePlate: 'NJ • ABC 1234',
    createdAt: '2026-04-01T08:30:00.000Z'
  },
  {
    userId: 'user_rider_001',
    openId: 'mock_openid_rider_001',
    nickName: 'Mia Li',
    avatarUrl: 'https://dummyimage.com/120x120/366DB3/ffffff&text=M',
    phone: '',
    cuVerified: true,
    cuEmail: 'mia@columbia.edu',
    rating: 4.8,
    totalTrips: 32,
    totalSaved: 286,
    department: 'TC',
    paymentMethods: ['zelle'],
    zelleAccount: 'mia@zelle.test',
    venmoAccount: '',
    carModel: '',
    licensePlate: '',
    createdAt: '2026-04-05T11:00:00.000Z'
  },
  {
    userId: 'user_rider_002',
    openId: 'mock_openid_rider_002',
    nickName: 'Ryan Wu',
    avatarUrl: 'https://dummyimage.com/120x120/F59E0B/ffffff&text=R',
    phone: '',
    cuVerified: true,
    cuEmail: 'ryan@columbia.edu',
    rating: 4.7,
    totalTrips: 18,
    totalSaved: 144,
    department: 'Business',
    paymentMethods: ['venmo'],
    zelleAccount: '',
    venmoAccount: '@ryanwu',
    carModel: '',
    licensePlate: '',
    createdAt: '2026-04-08T10:00:00.000Z'
  }
];

const currentUser = mockUsers[1];

const getUserById = (userId) => mockUsers.find((user) => user.userId === userId) || null;

module.exports = {
  mockUsers,
  currentUser,
  getUserById
};