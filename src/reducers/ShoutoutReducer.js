type State = {
  shoutouts: ?array;
  isEmpty: ?boolean;
};

const initialState: State = {
  shoutouts: [],
  isEmpty: false,
};

function shoutouts(state: State = initialState, action) {

  if (action.type === 'LOADED_SHOUTOUTS') {
    return {
      shoutouts: action.shoutouts
    }
  }

  if (action.type === 'SHOUTOUT_EMPTY') {
    return {
      shoutouts: [],
      isEmpty: true
    }
  }

  if (action.type === 'SHOUTOUT_CREATED') {
    return {
      shoutouts: [action.shoutout, ...state.shoutouts]
    }
  }

  if (action.type === 'SHOUTOUT_LIKED') {
    state.shoutouts[action.index].likes = state.shoutouts[action.index].likes + 1;
    state.shoutouts[action.index].liked = true;
    return {
      shoutouts: state.shoutouts
    }
  }

  if (action.type === 'SHOUTOUT_DISLIKED') {
    state.shoutouts[action.index].likes = state.shoutouts[action.index].likes - 1;
    state.shoutouts[action.index].liked = false;
    return {
      shoutouts: state.shoutouts
    }
  }

  if (action.type === 'SHOUTOUT_DELETED') {
    let newArray = [];
    for (var i = 0; i < state.shoutouts.length; i++) {
      if (i != action.index) {
        newArray.push(state.shoutouts[i]);
      }
    }

    return {
      shoutouts: newArray
    }
  }

  return state;
}

module.exports = shoutouts;
