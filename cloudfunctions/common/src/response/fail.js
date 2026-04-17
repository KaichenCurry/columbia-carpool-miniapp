const fail = (message, code = 'BAD_REQUEST', extra = {}) => ({
  success: false,
  code,
  message,
  ...extra
});

module.exports = fail;