import update from 'immutability-helper';

type State = {
  parties: ?array;
  party: Party;
};

const initialState: State = {
  parties: [],
  party: null,
  isEmpty: null
};

function parties(state: State = initialState, action) {
  if (action.type === 'LOADED_PARTIES') {
    return {
      ...state,
      parties: action.parties,
      isEmpty: false
    }
  }

  if (action.type === 'LOADED_PARTIES_EMPTY') {
    return {
      parties: [],
      isEmpty: action.empty
    }
  }

  if (action.type === 'LOADED_PARTY') {
    return {
      ...state,
      party: action.party
    }
  }

  if (action.type === 'EVENT_CREATED') {
    return {
      ...state,
      parties: [action.party, ...state.parties]
    }
  }

  if (action.type === 'PARTY_REQUESTED') {

    return update(state, {
      parties: {
        [action.index]: {
          join_status: {$set: action.status}
        }
      }
    });
  }

  if (action.type === 'PARTY_JOINED') {
    return update(state, {
      parties: {
        [action.index]: {
          join_status: {$set: action.status}
        }
      }
    });
  }

  if (action.type === 'PARTY_DELETED') {
    let newArray = [];
    for (var i = 0; i < state.parties.length; i++) {
      if (i != action.index) {
        newArray.push(state.parties[i]);
      }
    }

    return {
      parties: newArray
    }
  }

  if (action.type === 'PARTY_LEFT') {
    return update(state, {
      parties: {
        [action.index]: {
          join_status: {$set: action.status}
        }
      }
    });
  }

  if (action.type === 'PARTY_UPDATED') {
    state.parties[action.rowID] = action.party;
    return {
      ...state,
      parties: state.parties
    }
  }

  if (action.type === 'GENERIC_PARTY_LEFT') {
    return update(state, {
      party: {
        join_status: {$set: action.status}
      }
    });
  }

  if (action.type === 'GENERIC_PARTY_REQUESTED') {
    return update(state, {
      party: {
        join_status: {$set: action.status}
      }
    });
  }

  if (action.type === 'GENERIC_PARTY_JOINED') {
    return update(state, {
      party: {
        join_status: {$set: action.status}
      }
    });
  }

  return state;
}
module.exports = parties;
