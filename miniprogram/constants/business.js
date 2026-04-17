const TRIP_MODES = {
  RIDE: 'ride',
  UBER: 'uber'
};

const TRIP_MODE_OPTIONS = [
  {
    value: TRIP_MODES.RIDE,
    title: '顺风车',
    subtitle: '带人出行'
  },
  {
    value: TRIP_MODES.UBER,
    title: 'Uber拼单',
    subtitle: '打车AA'
  }
];

const TRIP_STATUS = {
  OPEN: 'open',
  FULL: 'full',
  DEPARTED: 'departed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

const PAYMENT_METHODS = ['zelle', 'venmo'];

const PAYMENT_METHOD_OPTIONS = [
  {
    value: 'zelle',
    label: 'Zelle',
    hint: '上车后转账给车主'
  },
  {
    value: 'venmo',
    label: 'Venmo',
    hint: '上车后转账给车主'
  }
];

const GWB_TOLL = 23.3;
const PASSENGER_FEE = 8;

const DEFAULT_MAP_CENTER = {
  latitude: 40.83,
  longitude: -73.965
};

const DEFAULT_MAP_SCALE = 13;

const DISCLAIMER_ITEMS = [
  '本平台仅用于 Fort Lee 与 Columbia 之间的通勤成本分摊。',
  '费用仅为过桥费、油费与补贴分摊，不属于营运服务。',
  '支付方式仅展示 Zelle 或 Venmo，实际线下转账。'
];

module.exports = {
  TRIP_MODES,
  TRIP_MODE_OPTIONS,
  TRIP_STATUS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS,
  GWB_TOLL,
  PASSENGER_FEE,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_SCALE,
  DISCLAIMER_ITEMS
};