const { formatCurrency } = require('../../utils/format');
const { GWB_TOLL, PASSENGER_FEE } = require('../../constants/business');

Component({
  properties: {
    trip: {
      type: Object,
      value: null,
      observer(trip) {
        if (!trip) {
          this.setData({ displayTrip: null });
          return;
        }

        this.setData({
          displayTrip: {
            ...trip,
            departureLabel: '8:30 AM',
            departureTag: '出发',
            departurePlace: 'Fort Lee, NJ · Main St & Bridge Plaza',
            gwbTitle: 'George Washington Bridge',
            arrivalLabel: '~9:10 AM',
            arrivalTag: '到达',
            arrivalPlace: 'Columbia University · Morningside Campus'
          },
          gwbToll: formatCurrency(GWB_TOLL),
          passengerFeeCompact: '$8'
        });
      }
    }
  },

  data: {
    displayTrip: null,
    gwbToll: formatCurrency(GWB_TOLL),
    passengerFeeCompact: '$8'
  }
});