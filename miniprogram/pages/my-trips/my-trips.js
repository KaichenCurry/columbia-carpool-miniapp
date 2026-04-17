const { getMyTrips } = require('../../services/trip.service');

const DRIVER_NAMES = {
  user_driver_001: '张伟',
  user_rider_001: '李洁'
};

const ACTIVE_TAB = 'active';
const HISTORY_TAB = 'history';

const buildTabs = (activeTab) => ([
  {
    key: ACTIVE_TAB,
    label: '进行中',
    className: activeTab === ACTIVE_TAB ? 'my-trips-page__tab my-trips-page__tab--active' : 'my-trips-page__tab'
  },
  {
    key: HISTORY_TAB,
    label: '历史',
    className: activeTab === HISTORY_TAB ? 'my-trips-page__tab my-trips-page__tab--active' : 'my-trips-page__tab'
  }
]);

const buildBottomNavItems = () => ([
  { key: 'home', label: '首页', icon: '🏠', labelClassName: 'my-trips-page__nav-label' },
  { key: 'trips', label: '我的行程', icon: '📄', labelClassName: 'my-trips-page__nav-label my-trips-page__nav-label--active' },
  { key: 'my', label: '我的', icon: '👤', labelClassName: 'my-trips-page__nav-label' }
]);

const buildActiveTrip = (trip) => {
  if (!trip) {
    return null;
  }

  return {
    tripId: trip.tripId,
    timeLabel: '8:30 AM',
    routeLabel: 'Fort Lee → Columbia',
    driverName: DRIVER_NAMES[trip.driverId] || trip.driver.nickName,
    seatsLabel: '3/4人',
    priceLabel: '$8',
    dayLabel: '今天'
  };
};

const buildHistoryTrips = (trips) => {
  const templates = [
    {
      timeLabel: '6:30 PM',
      tagLabel: '顺风车',
      tagClassName: 'my-trips-page__history-tag my-trips-page__history-tag--ride',
      metaLabel: '昨天 · Columbia → Fort Lee',
      amountLabel: '$8',
      savingsLabel: '省$22'
    },
    {
      timeLabel: '8:15 AM',
      tagLabel: 'Uber',
      tagClassName: 'my-trips-page__history-tag my-trips-page__history-tag--uber',
      metaLabel: '4月13日 · Fort Lee → Columbia',
      amountLabel: '$13',
      savingsLabel: '省$18'
    },
    {
      timeLabel: '9:00 AM',
      tagLabel: '顺风车',
      tagClassName: 'my-trips-page__history-tag my-trips-page__history-tag--ride',
      metaLabel: '4月12日 · Fort Lee → Columbia',
      amountLabel: '$8',
      savingsLabel: '省$22'
    }
  ];

  return templates.map((item, index) => ({
    key: trips[index] ? trips[index].tripId : `history-${index}`,
    ...item
  }));
};

Page({
  data: {
    activeTab: ACTIVE_TAB,
    tabs: buildTabs(ACTIVE_TAB),
    bottomNavItems: buildBottomNavItems(),
    activeTrip: null,
    historyTrips: []
  },

  onShow() {
    getMyTrips().then(({ activeTrips, historyTrips }) => {
      this.setData({
        activeTrip: buildActiveTrip(activeTrips[0]),
        historyTrips: buildHistoryTrips(historyTrips)
      });
    });
  },

  handleTabChange(event) {
    const { tab } = event.currentTarget.dataset;
    this.setData({
      activeTab: tab,
      tabs: buildTabs(tab)
    });
  },

  handleOpenTrip(event) {
    const { tripId } = event.currentTarget.dataset;
    if (!tripId) {
      return;
    }

    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?tripId=${tripId}`
    });
  },

  handleBottomNavTap(event) {
    const { key } = event.currentTarget.dataset;
    if (key === 'trips') {
      return;
    }

    const url = key === 'home' ? '/pages/index/index' : '/pages/my/my';
    wx.switchTab({ url });
  }
});