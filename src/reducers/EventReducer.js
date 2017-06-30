type State = {
  fromEdit: ?boolean;
  title: Title;
  houseRules: HouseRules;
  gender: Gender;
  age: Age;
  address: ?string;
  private: Private;
  date: Date;
  picture: Picture;
  invites: ?array;
};

const initialState: State = {
  fromEdit: false,
  title: '',
  houserules: '',
  gender: '',
  address: '',
  age_from: 19,
  age_to: 25,
  time_start: 16,
  time_end: 27,
  date: new Date().setHours(0, 0, 0, 0, 0),
  lat: null,
  lng: null,
  private: 0,
  image: null,
  invites: [],
  picture: null,
  hasChangedImageFromEdit: false
};

function event(state: State = initialState, action) {
  if (action.type === 'SET_PICTURE') {
    return {
      ...state,
      picture: action.picture
    }
  }

  if (action.type === 'SET_FILENAME') {
    return {
      ...state,
      image: action.filename
    }
  }

  if (action.type === 'APPEND_GUEST') {
    return {
      ...state,
      invites: [...state.invites, action.guest]
    }
  }

  if (action.type === 'REMOVE_GUEST') {
    let newArray = [];
    for (var i = 0; i < state.invites.length; i++) {
      if (i != action.index) {
        newArray.push(state.invites[i]);
      }
    }

    return {
      invites: newArray
    }
  }

  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.title
    }
  }

  if (action.type === 'SET_HOUSERULES') {
    return {
      ...state,
      houserules: action.houserules
    }
  }

  if (action.type === 'SET_GENDER') {
    return {
      ...state,
      gender: action.gender
    }
  }

  if (action.type === 'SET_REGION') {
    return {
      ...state,
      lat: action.region.latitude,
      lng: action.region.longitude
    }
  }

  if (action.type === 'SET_ADDRESS') {
    return {
      ...state,
      address: action.address
    }
  }

  if (action.type === 'SET_AGE') {
    return {
      ...state,
      age_from: action.age[0],
      age_to: action.age[1]
    }
  }

  if (action.type === 'SET_TIME') {
    return {
      ...state,
      time_start: action.time[0],
      time_end: action.time[1]
    }
  }

  if (action.type === 'SET_DATE') {
    return {
      ...state,
      date: action.date.setHours(0, 0, 0, 0, 0)
    }
  }

  if (action.type === 'SET_PRIVATE') {
    let privateStatus = action.private ? 1 : 0;
    return {
      ...state,
      private: privateStatus
    }
  }

  if (action.type === 'CLEAR_EVENT') {
    return initialState
  }

  if (action.type === 'EDIT_EVENT') {
    return action.party
  }

  if (action.type === 'CHANGED_PICTURE') {
    return {
      ...state,
      hasChangedImageFromEdit: true
    }
  }

  return state;
}

module.exports = event;
