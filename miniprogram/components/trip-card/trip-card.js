const { formatTime } = require('../../utils/time');
const { formatCompactCurrency } = require('../../utils/format');

const AVATAR_BACKGROUNDS = {
  user_driver_001: '#E2E7FA',
  user_rider_001: '#F1DDD7',
  user_rider_002: '#F4E3DB'
};

const DISPLAY_NAMES = {
  user_driver_001: '张伟',
  user_rider_001: '李洁',
  user_rider_002: 'Ryan'
};

const buildRideDisplayTrip = (trip) => {
  const formattedTime = formatTime(trip.departureTime).split(' ');
  const departureMain = formattedTime[0] || '--:--';
  const departureSuffix = formattedTime[1] || '';
  const isUber = trip.type === 'uber';
  const uberMissing = Math.max(4 - trip.occupiedSeats - 1, 0);

  return {
    ...trip,
    departureMain,
    departureSuffix,
    displayName: DISPLAY_NAMES[trip.driver.userId] || trip.driver.nickName,
    routeLabel: 'Fort Lee → Columbia',
    typeTagClass: isUber ? 'trip-card__type-tag trip-card__type-tag--uber' : 'trip-card__type-tag trip-card__type-tag--ride',
    typeTagLabel: isUber ? 'Uber' : '顺风车',
    actionLabel: isUber ? '加入拼单' : '加入拼车',
    metaLabel: `⭐ ${trip.driver.rating} · ${trip.driver.totalTrips}次`,
    pricePrefix: isUber ? '预估' : '',
    priceValue: formatCompactCurrency(trip.pricePerPerson),
    priceSuffix: isUber ? '/人 (4人拼)' : '/人',
    ctaClassName: isUber ? 'trip-card__action trip-card__action--uber' : 'trip-card__action',
    priceClassName: isUber ? 'trip-card__price trip-card__price--uber' : 'trip-card__price',
    showSeatDots: !isUber,
    uberHint: isUber && uberMissing > 0 ? `还差${uberMissing}人` : '',
    avatarPlaceholderStyle: `background:${AVATAR_BACKGROUNDS[trip.driver.userId] || '#E2E7FA'};`
  };
};

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
          displayTrip: buildRideDisplayTrip(trip)
        });
      }
    },
    showJoinButton: {
      type: Boolean,
      value: true
    },
    variant: {
      type: String,
      value: 'default'
    }
  },

  data: {
    displayTrip: null
  },

  methods: {
    handleTap() {
      if (!this.properties.trip) {
        return;
      }

      this.triggerEvent('cardtap', { tripId: this.properties.trip.tripId });
    },

    handleJoin() {
      if (!this.properties.trip) {
        return;
      }

      this.triggerEvent('join', { tripId: this.properties.trip.tripId });
    }
  }
});