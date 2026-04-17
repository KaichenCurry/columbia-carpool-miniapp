const cloud = require('wx-server-sdk');
const { COLLECTIONS } = require('../db/collections');

const getCurrentOpenId = () => {
  const { OPENID } = cloud.getWXContext();
  return OPENID;
};

const getCurrentUser = async (db) => {
  const openId = getCurrentOpenId();
  const result = await db.collection(COLLECTIONS.USERS).where({ openId }).limit(1).get();
  return {
    openId,
    user: result.data[0] || null
  };
};

module.exports = {
  getCurrentOpenId,
  getCurrentUser
};