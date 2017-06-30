
type State = {
  count: ?Integer;
  unseen: ?Integer;
  message: ?String;
  notifications: ?Array;
};

const initialState: State = {
  count: 0,
  unseen: 0,
  message: 'unknown',
  notifications: []
};

function notifications(state: State = initialState, action) {

  if (action.type === 'NOTIFICATIONS_LOADED') {
    const { count, unseen, message, notifications} = action.payload;
    return {
      ...state,
      count: count,
      unseen: unseen,
      message: message,
      notifications: notifications
    }
  }

  if (action.type === 'NOTIFICATION_EMPTY') {
    return {
      ...state,
      message: 'No notifications to display'
    }
  }

  return state;
}

module.exports = notifications;
