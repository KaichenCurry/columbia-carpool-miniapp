const cloud = require('wx-server-sdk');
const { auth, usersRepo, ok, fail } = require('../common/src');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  const { openId, user } = await auth.getCurrentUser(db);
  if (!user) {
    return fail('用户不存在', 'USER_NOT_FOUND', { openId });
  }

  const inviteCode = event.inviteCode || '';
  const cuEmail = event.cuEmail || user.cuEmail || '';
  const canVerify = Boolean(inviteCode) || /@columbia\.edu$/i.test(cuEmail);

  if (!canVerify) {
    return fail('认证信息不合法', 'INVALID_VERIFY_PAYLOAD');
  }

  await usersRepo.updateUserByOpenId(db, openId, {
    cuVerified: true,
    cuEmail,
    updatedAt: new Date()
  });

  return ok({
    openId,
    cuVerified: true,
    cuEmail
  });
};