const MAP_LABEL_ICON = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg width="1" height="1" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
    <rect width="1" height="1" fill="rgba(0,0,0,0)"/>
  </svg>
`);

const LOCATIONS = {
  fortLee: {
    key: 'fortLee',
    label: 'Fort Lee 地区',
    icon: '🏠',
    places: [
      { id: 'fl_100modern', name: '100 Modern', lat: 40.8512, lng: -73.971 },
      { id: 'fl_800modern', name: '800 Modern', lat: 40.8495, lng: -73.9705 },
      { id: 'fl_fiathouse', name: 'Fiat House', lat: 40.852, lng: -73.9695 },
      { id: 'fl_2050', name: '2050', lat: 40.853, lng: -73.972 },
      { id: 'fl_hudsonlight', name: 'Hudson Light', lat: 40.8485, lng: -73.9715 },
      { id: 'fl_downtown', name: 'FL市区', lat: 40.8509, lng: -73.9723 }
    ]
  },
  columbia: {
    key: 'columbia',
    label: '哥大',
    icon: '🎓',
    places: [
      { id: 'cu_main', name: '主校区', lat: 40.8075, lng: -73.9626 },
      { id: 'cu_medical', name: '医学院', lat: 40.8405, lng: -73.9422 },
      { id: 'cu_business', name: '商学院', lat: 40.8185, lng: -73.96 },
      { id: 'cu_tc', name: 'TC', lat: 40.8078, lng: -73.9588 },
      { id: 'cu_sipa', name: 'SIPA', lat: 40.807, lng: -73.9598 }
    ]
  }
};

const MAP_MARKERS = [
  {
    id: 1,
    latitude: 40.8504,
    longitude: -73.9745,
    width: 1,
    height: 1,
    iconPath: MAP_LABEL_ICON,
    anchor: {
      x: 0,
      y: 0
    },
    callout: {
      content: 'Fort Lee, NJ',
      color: '#FFFFFF',
      bgColor: '#33B259',
      borderRadius: 10,
      padding: 6,
      display: 'ALWAYS',
      fontSize: 10,
      textAlign: 'center'
    }
  },
  {
    id: 2,
    latitude: 40.8509,
    longitude: -73.9545,
    width: 1,
    height: 1,
    iconPath: MAP_LABEL_ICON,
    anchor: {
      x: 0,
      y: 0
    },
    callout: {
      content: '🌉 GWB $23.30',
      color: '#FFFFFF',
      bgColor: '#F59E0A',
      borderRadius: 14,
      padding: 8,
      display: 'ALWAYS',
      fontSize: 13,
      textAlign: 'center'
    }
  },
  {
    id: 3,
    latitude: 40.8086,
    longitude: -73.9625,
    width: 1,
    height: 1,
    iconPath: MAP_LABEL_ICON,
    anchor: {
      x: 0,
      y: 0
    },
    callout: {
      content: '🎓 Columbia',
      color: '#FFFFFF',
      bgColor: '#1D4F91',
      borderRadius: 10,
      padding: 6,
      display: 'ALWAYS',
      fontSize: 10,
      textAlign: 'center'
    }
  }
];

const MAP_POLYLINE = [
  {
    points: [
      { latitude: 40.8502, longitude: -73.9726 },
      { latitude: 40.8489, longitude: -73.9672 },
      { latitude: 40.8451, longitude: -73.9605 },
      { latitude: 40.8422, longitude: -73.9554 },
      { latitude: 40.8386, longitude: -73.9498 },
      { latitude: 40.8341, longitude: -73.9448 },
      { latitude: 40.8287, longitude: -73.9411 },
      { latitude: 40.8227, longitude: -73.9408 },
      { latitude: 40.8169, longitude: -73.9441 },
      { latitude: 40.8115, longitude: -73.9518 },
      { latitude: 40.8081, longitude: -73.9623 }
    ],
    color: '#1D4F91CC',
    width: 5,
    dottedLine: false,
    arrowLine: false,
    borderColor: '#1D4F9133',
    borderWidth: 1
  }
];

const GROUP_OPTIONS = Object.values(LOCATIONS).map((group) => ({
  key: group.key,
  label: group.label,
  icon: group.icon,
  places: group.places
}));

const findLocationById = (placeId) => {
  for (const group of Object.values(LOCATIONS)) {
    const place = group.places.find((item) => item.id === placeId);
    if (place) {
      return {
        ...place,
        groupKey: group.key,
        groupLabel: group.label,
        groupIcon: group.icon
      };
    }
  }

  return null;
};

module.exports = {
  LOCATIONS,
  MAP_MARKERS,
  MAP_POLYLINE,
  GROUP_OPTIONS,
  findLocationById
};