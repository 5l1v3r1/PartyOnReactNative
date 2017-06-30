type State = {
  latitude: Latitude;
  longitude: Longitude;
  city: City;
};

const initialState: State = {
  latitude: null,
  longitude: null,
  city: null,
};

function location(state: State = initialState, action) {
  if (action.type === 'SET_POSITION') {
    let {latitude, longitude, city} = action;
    return {
      ...state,
      latitude,
      longitude,
      city
    }
  }

  return state;
}

module.exports = location;
