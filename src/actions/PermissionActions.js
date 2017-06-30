import {
  PermissionsAndroid
} from 'react-native';

async function requestLocationPermissions() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location permission',
        'message': 'To be able to view parties in your area, we need to be able to access your device location'
      }
    )
    if (granted) {
      return granted;
    } else {
      console.log('Location-permission denied');
    }
  } catch (e) {
    console.warn(e);
  }
}

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Camera Permissions',
        'message': 'To be able to create shoutouts, PartyOn needs permission to use the camera'
      }
    )
    if (granted) {
      return granted;
    } else {
      console.log('Location-permission denied');
    }
  } catch (e) {
    console.warn(e);
  }
}

async function requestOverlayPermission() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
      {
        'title': 'Facebook Overlay',
        'message': 'Facebook login overlay requires a permission'
      }
    )

    if (granted) {
      return granted;
    } else {
      console.log('SYSTEM_ALERT_WINDOW denied');
    }
  } catch (e) {
    console.warn(e);
  }
}

module.exports = {
  requestLocationPermissions,
  requestCameraPermission,
  requestOverlayPermission
}
