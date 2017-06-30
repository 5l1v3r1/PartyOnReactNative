const {getFriendsList, createParty, updateParty} = require('../api/PartyOnAPI');

function setEventPicture(data) {
  return {
    type: 'SET_PICTURE',
    picture: data
  }
}

function setFilename(filename) {
  return {
    type: 'SET_FILENAME',
    filename: filename
  }
}

function appendGuest(guest) {
  return {
    type: 'APPEND_GUEST',
    guest: guest
  }
}

function removeGuest(index) {
  return {
    type: 'REMOVE_GUEST',
    index: index
  }
}

function setTitle(title) {
  return {
    type: 'SET_TITLE',
    title: title
  }
}

function setHouserules(houserules) {
  return {
    type: 'SET_HOUSERULES',
    houserules: houserules
  }
}

function setGender(gender) {
  return {
    type: 'SET_GENDER',
    gender: gender
  }
}

function setRegion(region) {
  return {
    type: 'SET_REGION',
    region: region
  }
}

function setAge(age) {
  return {
    type: 'SET_AGE',
    age: age
  }
}

function setTime(time) {
  return {
    type: 'SET_TIME',
    time: time
  }
}

function setDate(date) {
  return {
    type: 'SET_DATE',
    date: date
  }
}

function setPrivate(value) {
  return {
    type: 'SET_PRIVATE',
    private: value
  }
}

function clearEvent() {
  return {
    type: 'CLEAR_EVENT'
  }
}

function editEvent(party) {
  return {
    type: 'EDIT_EVENT',
    party: party
  }
}

function partyUpdated(party, rowID) {
  return {
    type: 'PARTY_UPDATED',
    party: party,
    rowID: rowID
  }
}

function eventCreated(party) {
  return {
    type: 'EVENT_CREATED',
    party: party
  }
}

function changedPictureFromEdit() {
  return {
    type: 'CHANGED_PICTURE'
  }
}

function getFriendsListActionCreator(fbids) {
  return (dispatch) => {
    return getFriendsList(fbids);
  }
}

function editPartyActionCreator(party) {
  return (dispatch) => {
    console.log('PARTY: ', party);
    let event = {
      fromEdit: true,
      title: party.title,
      houserules: party.houserules,
      gender: party.gender,
      age_from: party.age_from,
      age_to: party.age_to,
      address: party.location,
      time_start: fixTime(parseInt(party.time_start.substring(0, 2))),
      time_end: fixTime(parseInt(party.time_end.substring(0, 2))),
      date: party.date,
      lat: parseFloat(party.lat),
      lng: parseFloat(party.lng),
      image: party.image,
      picture: party.image,
      invites: party.guestlist
    }

    dispatch(editEvent(event));
  }
}

function fixTime(time) {
  switch (time) {
    case 0:
      return 24
      break;
    case 1:
      return 25
      break;
    case 2:
      return 26
      break;
    case 3:
      return 27
      break;
    case 4:
      return 28
      break;
    case 5:
      return 29
      default:
      return time;
  }
}

function updatePartyActionCreator(party, partyId, rowID) {
  return (dispatch, getState) => {
    delete party.fromEdit;
    //delete party.image;
    delete party.picture;
    delete party.hasChangedImageFromEdit;
    let payload = {
      ...party,
      profile_id: getState().user.profileId,
      location: party.address,
      time_start: convertTime(party.time_start) + ':00',
      time_end: convertTime(party.time_end) + ':00',
      invites: party.invites.join(','),
      date: party.date / 1000
    }
    console.log('PAYLOAD: ', payload);
    return updateParty(payload, partyId).then(
      (result) => {
        dispatch(partyUpdated({...result.party, date: payload.date * 1000, creator: getState().user}, rowID));
      }
    )
  }
}

function createPartyActionCreator(party) {
  return (dispatch, getState) => {
    delete party.picture;
    delete party.hasChangedImageFromEdit;
    let payload = {
      ...party,
      profile_id: getState().user.profileId,
      location: party.address,
      time_start: convertTime(party.time_start) + ':00',
      time_end: convertTime(party.time_end) + ':00',
      date: party.date / 1000
    }

    if (party.invites.length > 0) {
      payload.invites = party.invites.join(',');
    } else {
      delete payload.invites
    }

    console.log('CREATE_PARTY PAYLOAD: ', payload);
    return createParty(payload)
      .then((result) => dispatch(eventCreated({...result, distance: 'distanceVeryClose', date: result.date * 1000, creator: getState().user})));
  }
}

function convertTime(time) {
  if (time >= 24) {
    return `0${time - 24}`;
  }
  return time;
}

module.exports = {
  setEventPicture,
  appendGuest,
  removeGuest,
  setTitle,
  setHouserules,
  setGender,
  setRegion,
  setAge,
  setTime,
  setDate,
  setPrivate,
  setFilename,
  getFriendsListActionCreator,
  clearEvent,
  editPartyActionCreator,
  createPartyActionCreator,
  updatePartyActionCreator,
  changedPictureFromEdit
};
