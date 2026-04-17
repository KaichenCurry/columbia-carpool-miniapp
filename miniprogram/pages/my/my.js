const { DISCLAIMER_ITEMS } = require('../../constants/business');
const { getUserProfile } = require('../../services/trip.service');

Page({
  data: {
    user: null,
    paymentMethodLabels: [],
    disclaimerItems: DISCLAIMER_ITEMS,
    actionCards: [
      { key: 'verify', title: '哥大认证', subtitle: '完善认证信息' },
      { key: 'payment', title: '支付账号', subtitle: '维护 Zelle / Venmo' },
      { key: 'help', title: '使用说明', subtitle: '查看免责与产品说明' }
    ]
  },

  onShow() {
    getUserProfile().then((user) => {
      this.setData({
        user,
        paymentMethodLabels: (user.paymentMethods || []).map((item) => item.toUpperCase())
      });
    });
  },

  handleCardTap(event) {
    wx.showToast({
      title: `${event.currentTarget.dataset.title} 下一阶段补全`,
      icon: 'none'
    });
  }
});