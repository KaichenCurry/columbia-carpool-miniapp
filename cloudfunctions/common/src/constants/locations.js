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
  findLocationById
};