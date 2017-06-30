export type State = {
  isLoggedIn: boolean;
  fbid: ?string;
  profileId: ?string;
  firstname: ?string;
  lastname: ?string;
  email: ?string;
  parties: ?array;
  notifications: ?number;
  shoutouts: ?array;
  attendings: ?array;
};

const initialState = {
  isLoggedIn: false,
  fbid: null,
  profileId: null,
  firstname: null,
  lastname: null,
  email: null,
  image: '',
  gender: 'Not Specified',
  birthdate: 'Not Specified',
  points: null,
  bio: 'Not Specified',
  shoutoutsIsEmpty: false,
  partiesIsEmpty: false,
  notifications: null,
  parties: [],
  shoutouts: [],
  attendings: [],
  noAttendings: false,
};

const strings = require('../strings/strings');

function user(state = initialState, action) {

  if (action.type === 'LOGGED_IN') {
    let { fbid, profileId, firstname, lastname, image, email, notifications, gender, birthdate, bio, points,  } = action;
    if (birthdate == null) {
      birthdate = 'Not Specified'
    }
    return {
      ...state,
      isLoggedIn: true,
      fbid,
      profileId,
      firstname,
      lastname,
      email,
      image,
      notifications,
      gender,
      bio,
      birthdate,
      points
    }
  }

  if (action.type === 'LOGGED_OUT') {
    return {
       ...state,
       isLoggedIn: false
    }
  }

  if (action.type === 'SET_GENDER') {
    let gender;
    if (action.gender === 'male') {
      gender = 'Male'
    } else {
      gender = 'Female'
    }
    return {
      ...state,
      gender: gender
    }
  }

  if (action.type === 'SET_AGE') {
    return {
      ...state,
      birthdate: action.age
    }
  }

  if (action.type === 'SET_BIO') {
    return {
      ...state,
      bio: action.bio
    }
  }

  if (action.type === 'NOTIFICATIONS_READ') {
    return {
      ...state,
      notifications: 0
    }
  }

  if (action.type === 'SET_FRIENDS') {
    return {
      ...state,
      friends: action.friends
    }
  }

  if (action.type === 'LOADED_MY_PARTIES') {
    return {
      ...state,
      partiesIsEmpty: false,
      parties: action.parties.reverse()
    }
  }

  if (action.type === 'GENERIC_PARTY_DELETED') {
    let newArray = [];
    for (var i = 0; i < state.parties.length; i++) {
      if (state.parties[i].party_id != action.partyId) {
        console.log('PUSHING PARTY: ', state.parties[i].party_id);
        newArray.push(state.parties[i]);
      }
    }
    return {
      ...state,
      parties: newArray
    }
  }

  if (action.type === 'LOADED_MY_SHOUTOUTS') {
    return {
      ...state,
      shoutoutsIsEmpty: false,
      shoutouts: action.shoutouts
    }
  }

  if (action.type === 'SHOUTOUT_DELETED_PROFILE') {
    let newArray = [];
    for (var i = 0; i < state.shoutouts.length; i++) {
      if (i != action.index) {
        newArray.push(state.shoutouts[i]);
      }
    }

    return {
      ...state,
      shoutouts: newArray
    }
  }

  if (action.type === 'SHOUTOUT_LIKED_PROFILE') {
    state.shoutouts[action.index].likes = state.shoutouts[action.index].likes + 1;
    state.shoutouts[action.index].liked = true;
    return {
      ...state,
      shoutouts: state.shoutouts
    }
  }

  if (action.type === 'SHOUTOUT_DISLIKED_PROFILE') {
    state.shoutouts[action.index].likes = state.shoutouts[action.index].likes - 1;
    state.shoutouts[action.index].liked = false;
    return {
      ...state,
      shoutouts: state.shoutouts
    }
  }

  if (action.type === 'LOADED_ATTENDINGS') {
    return {
      ...state,
      attendings: action.attendings,
      noAttendings: false,
    }
  }

  if (action.type === 'LOADED_ATTENDINGS_EMPTY') {
    return {
      ...state,
      noAttendings: true
    }
  }

  if (action.type === 'SET_PROFILE_IMAGE') {
    return {
      ...state,
      image: action.url
    }
  }

  if (action.type === 'LOADED_MY_SHOUTOUTS_EMPTY') {
    return {
      ...state,
      shoutoutsIsEmpty: true,
      shoutouts: []
    }
  }

  if (action.type === 'LOADED_MY_PARTIES_EMPTY') {
    return {
      ...state,
      partiesIsEmpty: true,
      parties: []
    }
  }

  if (action.type === 'SET_NOTIFICATION_COUNT') {
    return {
      ...state,
      notifications: action.count
    }
  }

  return state;
}


module.exports = user;
