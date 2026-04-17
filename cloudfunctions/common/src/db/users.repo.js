const { COLLECTIONS } = require('./collections');

const findUsersByIds = async (db, userIds = []) => {
  if (!userIds.length) {
    return [];
  }

  const uniqueIds = Array.from(new Set(userIds));
  const result = await db.collection(COLLECTIONS.USERS).where({ userId: db.command.in(uniqueIds) }).get();
  return result.data || [];
};

const findUserByOpenId = async (db, openId) => {
  const result = await db.collection(COLLECTIONS.USERS).where({ openId }).limit(1).get();
  return result.data[0] || null;
};

const updateUserByOpenId = async (db, openId, data) => {
  return db.collection(COLLECTIONS.USERS).where({ openId }).update({ data });
};

module.exports = {
  findUsersByIds,
  findUserByOpenId,
  updateUserByOpenId
};