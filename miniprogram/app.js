const CLOUD_ENV_ID = '';
// 请在本地开发时替换为你自己的微信云开发环境 ID

App({
  globalData: {
    appName: 'Fort Lee ↔ Columbia 拼车',
    primaryColor: '#1D4F91',
    user: null,
    hasAcceptedDisclaimer: false,
    cloudEnvId: CLOUD_ENV_ID
  },

  onLaunch() {
    if (wx.cloud) {
      const initOptions = {
        traceUser: true
      };

      if (CLOUD_ENV_ID) {
        initOptions.env = CLOUD_ENV_ID;
      }

      wx.cloud.init(initOptions);
    }
  }
});