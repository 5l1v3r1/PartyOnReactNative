const { getFilteredParties } = require('../api/PartyOnAPI');
const { loadedPartiesAction } = require('./PartyActions');

function setFilterAction(filter) {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
}

function setFilterDistance(distance) {
  return {
    type: 'SET_FILTER_DISTANCE',
    distance: distance
  }
}

function loadedPartiesEmpty(empty) {
  return {
    type: 'LOADED_PARTIES_EMPTY',
    empty: empty
  }
}

function setFilterAge(age) {
  return {
    type: 'SET_FILTER_AGE',
    age: age
  }
}

function setFilterGender(gender) {
  return {
    type: 'SET_FILTER_GENDER',
    gender: gender
  }
}

function setFilterActionCreator(profileId, position, filter, fromFeed) {
  return (dispatch) => {
    return getFilteredParties(profileId, position, filter).then(
      (result) => {
        console.log('RESULT FILTER: ', result);
        if (result.length == 0 && fromFeed) {
          dispatch(loadedPartiesEmpty('PARTIES'))
        } else if (result.length == 0 && !fromFeed) {
          dispatch(loadedPartiesEmpty('FILTER'))
        } else {
          for (party of result) {
            party.date = party.date * 1000;
          }
          dispatch(loadedPartiesAction(result));
        }
      }
    )
  }
}

module.exports = {
  setFilterActionCreator,
  setFilterDistance,
  setFilterAge,
  setFilterGender
}
