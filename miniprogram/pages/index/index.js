const { TRIP_MODES } = require('../../constants/business');
const { GROUP_OPTIONS } = require('../../constants/locations');
const { getTrips, createTrip, getCreateTripHint } = require('../../services/trip.service');
const { formatDateTimeLabel } = require('../../utils/time');

const applyHintToForm = (form, hint) => {
  if (!hint || !hint.suggestedDepartureTime) {
    return form;
  }

  const nextDate = new Date(hint.suggestedDepartureTime);
  if (Number.isNaN(nextDate.getTime())) {
    return form;
  }

  return {
    ...form,
    departureTime: nextDate.toISOString(),
    departureLabel: formatDateTimeLabel(nextDate)
  };
};

const buildModeTabs = (activeMode) => ([
  { key: TRIP_MODES.RIDE, label: '🚗 顺风车' },
  { key: TRIP_MODES.UBER, label: '🚕 Uber拼单' }
].map((tab) => ({
  ...tab,
  active: tab.key === activeMode,
  className: tab.key === activeMode ? 'index-page__tab index-page__tab--active' : 'index-page__tab'
})));

const buildEmptyStateLabel = (activeMode) => (
  activeMode === TRIP_MODES.RIDE ? '当前没有可加入的顺风车' : '当前没有可加入的 Uber 拼单'
);

const buildBottomNavItems = () => ([
  { key: 'home', label: '首页', icon: '🏠', iconClassName: 'index-page__nav-icon', labelClassName: 'index-page__nav-label index-page__nav-label--active' },
  { key: 'trips', label: '我的行程', icon: '📄', iconClassName: 'index-page__nav-icon', labelClassName: 'index-page__nav-label' },
  { key: 'my', label: '我的', icon: '👤', iconClassName: 'index-page__nav-icon', labelClassName: 'index-page__nav-label' }
]);

const buildInitialForm = () => {
  const now = new Date();
  return {
    mode: TRIP_MODES.RIDE,
    fromGroupKey: GROUP_OPTIONS[0].key,
    fromLabel: GROUP_OPTIONS[0].places[0].name,
    fromGroupLabel: GROUP_OPTIONS[0].label,
    toGroupKey: GROUP_OPTIONS[1].key,
    toLabel: GROUP_OPTIONS[1].places[0].name,
    toGroupLabel: GROUP_OPTIONS[1].label,
    departureTime: now.toISOString(),
    departureLabel: formatDateTimeLabel(now),
    seatCount: 3
  };
};

Page({
  data: {
    activeMode: TRIP_MODES.RIDE,
    modeTabs: buildModeTabs(TRIP_MODES.RIDE),
    bottomNavItems: buildBottomNavItems(),
    emptyStateLabel: buildEmptyStateLabel(TRIP_MODES.RIDE),
    tripCountToday: 12,
    trips: [],
    loading: false,
    createSheetVisible: false,
    createForm: buildInitialForm(),
    createAiHint: null,
    createAiLoading: false
  },

  onLoad() {
    this.loadTrips();
  },

  onPullDownRefresh() {
    this.loadTrips().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  loadTrips() {
    this.setData({ loading: true });

    return getTrips({ type: this.data.activeMode })
      .then((trips) => {
        this.setData({ trips });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  refreshCreateAiHint(formPatch = {}) {
    const nextForm = {
      ...this.data.createForm,
      ...formPatch
    };

    this.setData({ createAiLoading: true });

    return getCreateTripHint(nextForm)
      .then((hint) => {
        this.setData({
          createAiHint: hint,
          createAiLoading: false
        });
        return hint;
      })
      .catch(() => {
        this.setData({
          createAiHint: null,
          createAiLoading: false
        });
        return null;
      });
  },

  handleModeChange(event) {
    const mode = event.currentTarget.dataset.mode;
    if (mode === this.data.activeMode) {
      return;
    }

    this.setData({
      activeMode: mode,
      modeTabs: buildModeTabs(mode),
      emptyStateLabel: buildEmptyStateLabel(mode)
    });

    this.loadTrips();
  },

  handleTripTap(event) {
    const { tripId } = event.detail;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?tripId=${tripId}`
    });
  },

  handleJoinTrip(event) {
    const { tripId } = event.detail;
    wx.navigateTo({
      url: `/pages/join-confirm/join-confirm?tripId=${tripId}`
    });
  },

  handleBottomNavTap(event) {
    const { key } = event.currentTarget.dataset;
    if (key === 'home') {
      return;
    }

    const url = key === 'trips' ? '/pages/my-trips/my-trips' : '/pages/my/my';
    wx.switchTab({ url });
  },

  openCreateSheet() {
    this.setData({ createSheetVisible: true });
    this.refreshCreateAiHint();
  },

  closeCreateSheet() {
    this.setData({
      createSheetVisible: false,
      createAiLoading: false
    });
  },

  handleCreateModeChange(event) {
    const mode = event.detail.value;
    this.setData({
      'createForm.mode': mode
    });
    this.refreshCreateAiHint({ mode });
  },

  handleCreateSeatChange(event) {
    this.setData({
      'createForm.seatCount': event.detail.value
    });
  },

  handleCreateFieldTap(event) {
    const { field } = event.detail;
    wx.showToast({
      title: `${field} 选择器下一阶段接入`,
      icon: 'none'
    });
  },

  handleCreateSwap() {
    const { fromLabel, fromGroupLabel, fromGroupKey, toLabel, toGroupLabel, toGroupKey } = this.data.createForm;
    const formPatch = {
      fromLabel: toLabel,
      fromGroupLabel: toGroupLabel,
      fromGroupKey: toGroupKey,
      toLabel: fromLabel,
      toGroupLabel: fromGroupLabel,
      toGroupKey: fromGroupKey
    };

    this.setData({
      'createForm.fromLabel': formPatch.fromLabel,
      'createForm.fromGroupLabel': formPatch.fromGroupLabel,
      'createForm.fromGroupKey': formPatch.fromGroupKey,
      'createForm.toLabel': formPatch.toLabel,
      'createForm.toGroupLabel': formPatch.toGroupLabel,
      'createForm.toGroupKey': formPatch.toGroupKey
    });

    this.refreshCreateAiHint(formPatch);
  },

  handleApplyAiHint() {
    if (!this.data.createAiHint) {
      return;
    }

    const nextForm = applyHintToForm(this.data.createForm, this.data.createAiHint);
    this.setData({
      createForm: nextForm
    });
  },

  handleCreateSubmit() {
    createTrip(this.data.createForm).then(() => {
      wx.showToast({
        title: '行程骨架已创建',
        icon: 'success'
      });
      this.closeCreateSheet();
      this.loadTrips();
    });
  }
});