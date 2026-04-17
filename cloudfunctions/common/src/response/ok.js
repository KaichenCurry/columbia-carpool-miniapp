const ok = (data = {}) => ({
  success: true,
  ...data
});

module.exports = ok;