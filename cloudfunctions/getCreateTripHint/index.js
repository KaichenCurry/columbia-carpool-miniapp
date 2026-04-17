const cloud = require('wx-server-sdk');
const {
  tripsRepo,
  validators,
  ok,
  fail,
  business
} = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const pad = (value) => String(value).padStart(2, '0');

const formatSuggestedLabel = (date) => {
  const hours = date.getHours();
  const normalizedHours = hours % 12 || 12;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${date.getMonth() + 1}月${date.getDate()}日 ${normalizedHours}:${pad(date.getMinutes())} ${suffix}`;
};

const buildHint = ({ mode, fromGroupKey, toGroupKey, sampleCount }) => {
  const suggestedDate = new Date();
  const isMorningRide = fromGroupKey === 'fortLee' && toGroupKey === 'columbia';
  const isEveningRide = fromGroupKey === 'columbia' && toGroupKey === 'fortLee';

  if (isMorningRide) {
    suggestedDate.setHours(mode === business.TRIP_MODES.UBER ? 8 : 8, mode === business.TRIP_MODES.UBER ? 45 : 15, 0, 0);
  } else if (isEveningRide) {
    suggestedDate.setHours(mode === business.TRIP_MODES.UBER ? 18 : 18, mode === business.TRIP_MODES.UBER ? 10 : 30, 0, 0);
  } else {
    suggestedDate.setHours(mode === business.TRIP_MODES.UBER ? 12 : 12, mode === business.TRIP_MODES.UBER ? 20 : 0, 0, 0);
  }

  let confidenceLabel = '中';
  let reason = '当前路线样本较少，先给出一个居中的推荐时间。';

  if (isMorningRide) {
    confidenceLabel = sampleCount >= 2 ? '高' : '中';
    reason = sampleCount >= 2
      ? 'Fort Lee → Columbia 在早高峰样本更多，建议 8 点前后发起更容易成团。'
      : 'Fort Lee → Columbia 属于典型通勤方向，建议在早高峰前后发起。';
  } else if (isEveningRide) {
    confidenceLabel = sampleCount >= 2 ? '高' : '中';
    reason = sampleCount >= 2
      ? 'Columbia → Fort Lee 在晚高峰返程更稳定，建议在 6 点前后发起。'
      : 'Columbia → Fort Lee 属于典型返程方向，建议在下课后时段发起。';
  }

  return {
    suggestedDepartureTime: suggestedDate.toISOString(),
    suggestedLabel: formatSuggestedLabel(suggestedDate),
    confidenceLabel,
    reason,
    sampleCount,
    version: 'heuristic_v1'
  };
};

exports.main = async (event = {}) => {
  const validationErrors = validators.validateCreateTripHint(event);
  if (validationErrors.length) {
    return fail('推荐参数不合法', 'INVALID_CREATE_TRIP_HINT', { errors: validationErrors });
  }

  const filter = {
    status: db.command.in([business.TRIP_STATUS.OPEN, business.TRIP_STATUS.FULL, business.TRIP_STATUS.DEPARTED, business.TRIP_STATUS.COMPLETED])
  };

  if (event.mode) {
    filter.type = event.mode;
  }
  if (event.fromGroupKey) {
    filter.fromGroup = event.fromGroupKey;
  }
  if (event.toGroupKey) {
    filter.toGroup = event.toGroupKey;
  }

  const trips = await tripsRepo.listTrips(db, filter);
  const hint = buildHint({
    mode: event.mode || business.TRIP_MODES.RIDE,
    fromGroupKey: event.fromGroupKey || 'fortLee',
    toGroupKey: event.toGroupKey || 'columbia',
    sampleCount: trips.length
  });

  return ok({ hint });
};