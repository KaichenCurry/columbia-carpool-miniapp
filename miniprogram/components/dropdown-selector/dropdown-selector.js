Component({
  properties: {
    icon: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    groupLabel: {
      type: String,
      value: ''
    },
    arrow: {
      type: String,
      value: '▼'
    }
  },

  methods: {
    handleTap() {
      this.triggerEvent('tap');
    }
  }
});