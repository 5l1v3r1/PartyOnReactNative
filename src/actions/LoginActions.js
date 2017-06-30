const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

import { switchTab } from './NavigationActions'

import OneSignal from 'react-native-onesignal';  // Import package from node modules
const {loginUser} = require('../api/PartyOnAPI');


function checkLoginActionCreator() {
  return (dispatch) => {
    AccessToken.getCurrentAccessToken().then(
      (result) => {
        if (result == null) {
          dispatch(logoutAction());
        } else {
          fetchFBUser(dispatch);
        }
      }
    );
  }
}

function loginFBuser() {
  return (dispatch) => {

  }
}


function fetchFBUser(dispatch) {
  const infoRequest = new GraphRequest(
    '/me?fields=email,first_name,last_name,id,gender',
    null,
    function responseInfoCallback(error: ?Object, result: ?Object) {
      if (error) {
        console.log('error fetching me');
      } else {
        console.log('FB-OBJECT: ', JSON.stringify(result));
        configureOneSignal(result, dispatch);
      }
    }
  );

  new GraphRequestManager().addRequest(infoRequest).start();
}

function configureOneSignal(result, dispatch) {
  OneSignal.configure({
      onIdsAvailable: function(device) {
          console.log('UserId = ', device.userId);
          console.log('PushToken = ', device.pushToken);
          loginUserServer(result, dispatch, device.userId);
      }
    // onNotificationOpened: function(message, data, isActive) {
    //     var notification = {message: message, data: data, isActive: isActive};
    //     console.log('NOTIFICATION OPENED: ', notification);
    //     //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
    //     //    console.log('Navigator is null, adding notification to pending list...');
    //         pendingNotifications.push(notification);
    //     //    return;
    //     // }
    //     handleNotification(notification, dispatch);
    // }
  });
  //OneSignal.enableNotificationsWhenActive(false);
  //OneSignal.enableInAppAlertNotification(false);
}

async function loginUserServer(user, dispatch, uuid) {
  try {
    let response = await loginUser(user, uuid);
    console.log('LOGIN RESPONSE: ', response);
    dispatch(loggedIn(user.id, user.gender, response.notifications, response.profile));
  } catch (e) {
  console.error(e);
  }
}

function loggedIn(fbid, gender, notifications, result) {
  console.log('RESULT: ', result);
  let user = {
    type: 'LOGGED_IN',
    initialRoute: 'root',
    fbid: fbid,
    profileId: result.profile_id,
    firstname: result.firstname,
    lastname: result.lastname,
    email: result.email,
    image: result.image,
    notifications: notifications,
    points: result.points,
    bio: result.bio
  }

  if (gender === 'male') {
    user.gender = 'Male'
  } else if (gender === 'female') {
    user.gender = 'Female'
  }

  if (result.birthdate) {
    user.birthdate = result.birthdate;
  }

  return user;
}

function logoutAction() {
  return {
    type: 'LOGGED_OUT',
    initialRoute: 'login'
  }
}

module.exports = {checkLoginActionCreator, logoutAction};
