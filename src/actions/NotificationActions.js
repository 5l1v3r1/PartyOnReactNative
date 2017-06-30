const {
  getNotifications,
  readNotifications
} = require('../api/PartyOnAPI');

function notificationsLoaded(payload) {
  return {
    type: 'NOTIFICATIONS_LOADED',
    payload: payload
  }
}

function notificationsEmpty() {
  return {
    type: 'NOTIFICATION_EMPTY'
  }
}

function notificationsRead() {
  return {
    type: 'NOTIFICATIONS_READ'
  }
}

function setNotificationCount(count) {
  return {
    type: 'SET_NOTIFICATION_COUNT',
    count: count
  }
}


function loadNotificationsActionCreator(profileId) {
  return (dispatch) => {
    return getNotifications(profileId)
      .then((response) => {
        console.log('response notifications: ', response);
        if (response.message === 'No notifications to display') {
          dispatch(notificationsEmpty())
        } else {
          dispatch(notificationsLoaded(response))
        }
      });
  }
}

function readNotificationsActionCreator(profileId) {
  return (dispatch) => {
    return readNotifications(profileId).then(
      (response) => {
        if (response.success) {
          dispatch(notificationsRead())
        }
      }
    )
  }
}

module.exports = {
  loadNotificationsActionCreator,
  readNotificationsActionCreator,
  setNotificationCount
};
