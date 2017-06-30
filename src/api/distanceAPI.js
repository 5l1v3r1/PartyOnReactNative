const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox';
const _ = require('lodash');

module.exports = function (firstPin, secondPin) {
  let waypoint1 = {
    longitude: firstPin.longitude,
    latitude: firstPin.latitude
  };

  let waypoint2 = {
    longitude: secondPin.longitude,
    latitude: secondPin.latitude
  };

  let url = `${baseUrl}/walking/${_.values(waypoint1).join(',')};${_.values(waypoint2).join(',')}?access_token=pk.eyJ1IjoibXV1aCIsImEiOiJjaW5hMXJjdWYwMDB0d3pseWFjYWFxeTRoIn0.cRsKrqI38usO6hatTv89cg`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((parsedResponse) => {
      return parsedResponse
    })
}
