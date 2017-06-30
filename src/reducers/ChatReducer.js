import update from 'immutability-helper';

type State = {
  chats: ?array;
  isEmpty: ?boolean;
  unreadCount: ?number;
};

const initialState: State = {
  chats: [],
  isEmpty: false,
  unreadCount: 0
};

function move(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
        newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
}

function chat(state: State = initialState, action) {

  if (action.type === 'CHATS_LOADED') {
    return {
      ...state,
      isEmpty: false,
      chats: action.chats
    }
  }

  if (action.type === 'CHAT_ADDED') {
    let newArray = [];
    let index;
    for (var i = 0; i < state.chats.length; i++) {
      if (state.chats[i].chat_id == action.chatId) {
        index = i;
        if (i > 0) {
          newArray = state.chats.splice(i, 1);
          state.chats.unshift(newArray[0]);
        }
      }
    }

    if (state.chats.length > 0) {
      return update(state, {
        chats: {
          [0]: {
            preview: {$set: action.message},
            entry: {
              timestamp: {$set: Math.floor(new Date().getTime() / 1000)}
            }
          }
        }
      });
    } else {
      return state;
    }


  }

  if (action.type === 'SET_CHAT_COUNT') {
    return {
      ...state,
      unreadCount: action.count
    }
  }

  if (action.type === 'CHATS_EMPTY') {
    return {
      ...state,
      isEmpty: true
    }
  }

  if (action.type === 'SET_MESSAGE_STATUS_UNREAD') {
    let index;
    for (var i = 0; i < state.chats.length; i++) {
      if (state.chats[i].chat_id == action.chatId) {
        index = i;
      }
    }

    if (state.chats.length > 0) {
      return update(state, {
        chats: {
          [index]: {
            status: {$set: 'unread'}
          }
        }
      });
    } else {
      return state;
    }

  }

  if (action.type === 'SET_MESSAGE_STATUS_READ') {
    let index;
    let unreadCount;
    for (var i = 0; i < state.chats.length; i++) {
      if (state.chats[i].chat_id == action.chatId) {
        index = i;
      }
    }

    if (state.unreadCount < 0) {
      unreadCount = 0;
    } else {
      unreadCount = state.unreadCount;
    }

    if (state.chats.length > 0) {
      return update(state, {
        chats: {
          [index]: {
            status: {$set: 'read'}
          }
        },
        unreadCount: {$set: unreadCount - action.count}
      });
    } else {
      return state;
    }


  }


  return state;
}

module.exports = chat;
