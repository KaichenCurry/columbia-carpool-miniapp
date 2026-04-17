const { getTripDetail, joinTrip } = require('../../services/trip.service');

const DRIVER_DISPLAY = {
  user_driver_001: {
    name: '张伟',
    avatarColor: '#D9E2F6',
    badgeText: '🎓 哥大认证',
    subtitle: '⭐ 4.9 · 86次 · Toyota Camry'
  }
};

const PASSENGER_DISPLAY = {
  user_rider_001: {
    name: '王明',
    detail: 'CS 研二',
    avatarColor: '#DCCAF1',
    badgeText: '🎓 CU'
  },
  user_rider_002: {
    name: '赵雪',
    detail: 'SIPA 研一',
    avatarColor: '#D4E8F1',
    badgeText: '🎓 CU'
  }
};

const PAYMENT_OPTIONS = [
  {
    value: 'zelle',
    label: 'Zelle',
    subtitle: '上车后转账给车主',
    icon: 'Z',
    iconClassName: 'join-page__payment-icon join-page__payment-icon--zelle'
  },
  {
    value: 'venmo',
    label: 'Venmo',
    subtitle: '',
    icon: 'V',
    iconClassName: 'join-page__payment-icon join-page__payment-icon--venmo'
  }
];

Page({
  data: {
    trip: null,
    driverDisplay: null,
    passengerItems: [],
    emptySeatItems: [],
    paymentOptions: [],
    selectedPaymentMethod: 'zelle',
    summaryTime: '8:30 AM',
    summaryRoute: 'Fort Lee → Columbia',
    summaryDay: '今天',
    totalLabel: '$8.00'
  },

  onLoad(query) {
    const tripId = query.tripId || 'trip_001';
    getTripDetail({ tripId }).then((trip) => {
      if (!trip || !trip.driver) {
        wx.showToast({
          title: '未找到行程',
          icon: 'none'
        });
        return;
      }

      const driverDisplay = DRIVER_DISPLAY[trip.driver.userId] || {
        name: trip.driver.nickName || '车主',
        avatarColor: '#D9E2F6',
        badgeText: '🎓 哥大认证',
        subtitle: '⭐ 4.9 · 86次 · Toyota Camry'
      };

      const passengerItems = (trip.passengers || []).map((passenger) => {
        const fallback = PASSENGER_DISPLAY[passenger.userId] || {
          name: passenger.user && passenger.user.nickName ? passenger.user.nickName : '乘客',
          detail: '',
          avatarColor: '#DCCAF1',
          badgeText: '🎓 CU'
        };

        return {
          key: passenger.userId,
          name: fallback.name,
          detail: fallback.detail,
          avatarStyle: `background:${fallback.avatarColor};`,
          badgeText: fallback.badgeText
        };
      });

      const emptySeatItems = Array.from({ length: Number(trip.availableSeats || 0) }, (_, index) => ({
        key: `empty-${index}`
      }));

      this.setData({
        trip,
        driverDisplay,
        passengerItems,
        emptySeatItems,
        paymentOptions: PAYMENT_OPTIONS.map((item) => ({
          ...item,
          className: item.value === 'zelle' ? 'join-page__payment-item join-page__payment-item--active' : 'join-page__payment-item',
          checked: item.value === 'zelle'
        }))
      });
    });
  },

  handleBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  },

  handlePaymentChange(event) {
    const { value } = event.currentTarget.dataset;
    this.setData({
      selectedPaymentMethod: value,
      paymentOptions: PAYMENT_OPTIONS.map((item) => ({
        ...item,
        className: item.value === value ? 'join-page__payment-item join-page__payment-item--active' : 'join-page__payment-item',
        checked: item.value === value
      }))
    });
  },

  handleConfirm() {
    if (!this.data.trip) {
      return;
    }

    joinTrip({
      tripId: this.data.trip.tripId,
      paymentMethod: this.data.selectedPaymentMethod
    }).then(() => {
      wx.showToast({
        title: '已加入行程',
        icon: 'success'
      });
    });
  }
});