const cloud = require('wx-server-sdk');
const { auth, ok, fail } = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async () => {
  const { openId, user } = await auth.getCurrentUser(db);
  if (!user) {
    return fail('用户不存在', 'USER_NOT_FOUND', { openId });
  }

  return ok({
    profile: user
  });
};