const initCloud = () => {
  if (typeof wx === 'undefined' || !wx.cloud) {
    return false;
  }

  return true;
};

const getDatabase = () => {
  if (!initCloud()) {
    return null;
  }

  return wx.cloud.database();
};

const callFunction = ({ name, data = {} }) => {
  if (!initCloud()) {
    return Promise.reject(new Error('微信云开发尚未可用'));
  }

  return wx.cloud.callFunction({ name, data });
};

module.exports = {
  initCloud,
  getDatabase,
  callFunction
};