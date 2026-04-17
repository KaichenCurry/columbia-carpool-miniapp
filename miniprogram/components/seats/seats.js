Component({
  properties: {
    occupied: {
      type: Number,
      value: 0,
      observer() {
        this.syncDots();
      }
    },
    total: {
      type: Number,
      value: 4,
      observer() {
        this.syncDots();
      }
    }
  },

  data: {
    dots: []
  },

  lifetimes: {
    attached() {
      this.syncDots();
    }
  },

  methods: {
    syncDots() {
      const dots = Array.from({ length: this.properties.total }, (_, index) => ({
        key: index,
        className: index < this.properties.occupied ? 'seats__dot seats__dot--filled' : 'seats__dot seats__dot--empty'
      }));

      this.setData({ dots });
    }
  }
});