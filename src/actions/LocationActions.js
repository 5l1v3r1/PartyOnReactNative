import Geocoder from 'react-native-geocoder';
import { setRegion } from './CreateEventActions';
const options = {
  enableHighAccuracy: false,
  timeout: 25000,
  maximumAge: 1500
}

function setEventAddress(address) {
  return {
    type: 'SET_ADDRESS',
    address: address
  }
}

// TODO Should probably refactor this to be readable....
function getCurrentPosition() {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('INITIAL POS: ', position);
          let initialPosition = position.coords;
          return geocodePosition(initialPosition)
            .then((result) => {
              dispatch(setPosition(result));
            })
            .then(() => resolve())
            .catch((error) => {
              reject();
              return error;
            })
        },
        (error) => {
          reject();
          return error;
        },
        options
      );
    });
  }
}

function getAddressActionCreator(position) {
  return (dispatch) => {
    return geocodePosition(position).then(
      (result) => {
        let number, street;
        if (result[0].streetNumber == null) {
          number = '';
        } else {
          number = result[0].streetNumber;
        }

        if (result[0].streetName == null) {
          street = 'Unknown'
        } else {
          street = result[0].streetName
        }
        let address = `${street} ${number}`;
        dispatch(setEventAddress(address));
        return result;
      }
    )
  }
}

function geocodeAddressActionCreator(address, location) {
  return (dispatch) => {
    return geocodeAddress(`${address} ${location}`).then(
      (result) => {
        let region = {
          latitude: result[0].position.lat,
          longitude: result[0].position.lng
        }
        dispatch(setRegion(region));
        return result;
      }
    ).catch(
      (error) => {
        return error;
      }
    )
  }
}


async function geocodeAddress(address) {
  try {
    const result = await Geocoder.geocodeAddress(address);
    return result
  } catch (e) {
    return e;
  }
}

async function geocodePosition(position, dispatch) {
  let pos = {
    lat: position.latitude,
    lng: position.longitude
  };
  console.log('POS: ', pos);
  try {
    const result = await Geocoder.geocodePosition(pos);
    return result;
  } catch (error) {
    console.log('ERROR GEOCODING');
    console.log(error);
    return error;
  }
}

function setPosition(result) {
  console.log('POSITION: ', result);
  let {position, locality} = result[0];
  return {
    type: 'SET_POSITION',
    latitude: position.lat,
    longitude: position.lng,
    city: locality
  }
}

module.exports = {
  getCurrentPosition,
  getAddressActionCreator,
  setEventAddress,
  geocodeAddressActionCreator
};
