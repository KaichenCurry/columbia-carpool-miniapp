const { getTripDetail } = require('../../services/trip.service');

const DRIVER_DISPLAY = {
  user_driver_001: {
    name: '张伟',
    avatarColor: '#D9E2F6',
    badgeText: '🎓 哥大认证'
  }
};

const PASSENGER_DISPLAY = {
  user_rider_001: {
    name: '王明',
    avatarColor: '#DCCAF1'
  },
  user_rider_002: {
    name: '赵雪',
    avatarColor: '#D4E8F1'
  }
};

Page({
  data: {
    trip: null,
    totalLabel: '$8.00',
    totalCompactLabel: '$8',
    driverDisplay: null,
    passengerDisplayItems: [],
    emptySeatItems: []
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
        badgeText: '🎓 哥大认证'
      };

      const passengerDisplayItems = (trip.passengers || []).map((passenger) => {
        const fallback = PASSENGER_DISPLAY[passenger.userId] || {
          name: passenger.user && passenger.user.nickName ? passenger.user.nickName : '乘客',
          avatarColor: '#DCCAF1'
        };

        return {
          key: passenger.userId,
          name: fallback.name,
          avatarStyle: `background:${fallback.avatarColor};`
        };
      });

      const emptySeatItems = Array.from({ length: Number(trip.availableSeats || 0) }, (_, index) => ({
        key: `empty-${index}`
      }));

      this.setData({
        trip,
        driverDisplay,
        passengerDisplayItems,
        emptySeatItems
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

  handleJoin() {
    if (!this.data.trip) {
      return;
    }

    wx.navigateTo({
      url: `/pages/join-confirm/join-confirm?tripId=${this.data.trip.tripId}`
    });
  }
});