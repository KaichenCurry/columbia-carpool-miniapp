const { TRIP_MODES, PASSENGER_FEE } = require('../../constants/business');

const buildModeCards = (activeMode) => ([
  {
    value: TRIP_MODES.RIDE,
    icon: '🚗',
    title: '顺风车',
    subtitle: '带人出行'
  },
  {
    value: TRIP_MODES.UBER,
    icon: '🚕',
    title: '拼 Uber',
    subtitle: '打车AA'
  }
].map((item) => ({
  ...item,
  className: item.value === activeMode ? 'create-sheet__mode-card create-sheet__mode-card--active' : 'create-sheet__mode-card'
})));

const buildSeatOptions = (seatCount) => [1, 2, 3, 4].map((value) => ({
  value,
  className: value === seatCount ? 'create-sheet__seat create-sheet__seat--active' : 'create-sheet__seat'
}));

const formatDepartureLabel = (label) => {
  if (!label) {
    return '今天  8:30 AM';
  }

  if (label.includes('今天')) {
    return label.replace('今天 ', '今天  ');
  }

  return '今天  8:30 AM';
};

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    form: {
      type: Object,
      value: null,
      observer(form) {
        this.syncFormDisplay(form);
      }
    }
  },

  data: {
    modeCards: buildModeCards(TRIP_MODES.RIDE),
    seatOptions: buildSeatOptions(3),
    passengerFee: PASSENGER_FEE,
    displayForm: null
  },

  lifetimes: {
    attached() {
      this.syncFormDisplay(this.properties.form);
    }
  },

  methods: {
    noop() {},

    syncFormDisplay(form) {
      if (!form) {
        return;
      }

      this.setData({
        displayForm: {
          ...form,
          departureLabel: formatDepartureLabel(form.departureLabel)
        },
        modeCards: buildModeCards(form.mode),
        seatOptions: buildSeatOptions(form.seatCount)
      });
    },

    handleClose() {
      this.triggerEvent('close');
    },

    handleSubmit() {
      this.triggerEvent('submit');
    },

    handleSwap() {
      this.triggerEvent('swap');
    },

    handleModeTap(event) {
      this.triggerEvent('changemode', {
        value: event.currentTarget.dataset.value
      });
    },

    handleSeatTap(event) {
      this.triggerEvent('changeseat', {
        value: event.currentTarget.dataset.value
      });
    },

    handleFieldTap(event) {
      this.triggerEvent('tapfield', {
        field: event.currentTarget.dataset.field
      });
    }
  }
});