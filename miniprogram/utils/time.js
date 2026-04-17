const pad = (value) => String(value).padStart(2, '0');

const toDate = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
};

const formatTime = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) {
    return '--:--';
  }

  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const normalizedHours = hours % 12 || 12;
  return `${normalizedHours}:${minutes} ${suffix}`;
};

const formatDate = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) {
    return '';
  }

  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

const formatDateTimeLabel = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) {
    return '';
  }

  return `${formatDate(date)} ${formatTime(date)}`;
};

module.exports = {
  formatTime,
  formatDate,
  formatDateTimeLabel
};