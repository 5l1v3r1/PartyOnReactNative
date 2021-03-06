import React from 'react';
import {
  MapView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const TimerMixin = require('react-timer-mixin');
const { connect } = require('react-redux');
const DistanceAPI = require('../../../api/distanceAPI');
const Polyline = require('polyline');
const NavigationBar = require('react-native-navbar');
const BackArrow = require('../../commons/backButtonNavItem');
const { toggleBarStyle } = require('../../../actions');
const _ = require('lodash');

var PartyMap = React.createClass({
  watchID: (null: ?number),
  mixins: [TimerMixin],

  getInitialState() {
    return {
      partyLocation: {
        latitude: parseFloat(this.props.data.lat),
        longitude: parseFloat(this.props.data.lng),
        image: require('../../../resources/party-pin.png')
      },
      region: {
        latitude: parseFloat(this.props.data.lat),
        longitude: parseFloat(this.props.data.lng),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      },
      mapReadyToLoad: false,
      distanceFrom: null,
      overlay: [],
      isLoading: false,
      lastPosition: null,
    }
  },

  componentWillMount() {
    this.props.dispatch(toggleBarStyle());
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
    navigator.geolocation.clearWatch(this.watchID);
  },

  componentDidMount() {
    this.setTimeout(
      () => {
        this.setState({
          mapReadyToLoad: true
        });
      },
      500
    );
  },

  startWatchingPosition() {
    this.setState({
      isLoading: true
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let currentPos = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };

      this.fetchDirections(currentPos);
    },
    (error) => {
      console.log('ERROR WATCHING POS');
    },
    {enableHighAccuracy: true, distanceFilter: 10, timeout: 1000});
  },

  fetchDirections(userLocation) {
    DistanceAPI(userLocation, this.state.partyLocation)
      .then((response) => {
        console.log('RESPONSE DISTANCEAPI: ', response);
        this.decodePolyline(response);
      });
  },

  decodePolyline(response) {
    let decodedGeometry = [];
    var coords = Polyline.decode(response.routes[0].geometry);
    for (array of coords) {
      let waypoint = {
        latitude: array[0],
        longitude: array[1]
      };
      decodedGeometry.push(waypoint);
    }
    this.setState({
      distanceFrom: response.routes[0].distance,
      overlay: {
        coordinates: decodedGeometry,
        strokeColor: '#FF0055',
        lineWidth: 3
      },
      isLoading: false
    });
  },

  renderMap() {
    if (!this.state.mapReadyToLoad) {
      return <View style={styles.container}></View>
    }
    return(
      <View style={styles.container}>
        <MapView
          style={styles.mapView}
          region={this.state.region}
          showsUserLocation={true}
          overlays={[this.state.overlay]}
          annotations={[this.state.partyLocation]}
        />

      {this.renderBottomView()}
      </View>
      );
  },

  renderBottomView() {
    if (this.state.isLoading) {
      return(
        <View style={styles.bottomView}>
          <ActivityIndicator
            style={styles.activityIndicator}
            size='large'
            color='white'/>
        </View>
      );
    }

    if (this.state.overlay.length === 0) {
      return (
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={() => {
              this.startWatchingPosition();
            }}>
            <Text style={styles.distanceText}>Naviger</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return(
      <View style={styles.bottomView}>
        <Text style={styles.distanceText}>
          {`${this.state.distanceFrom} meter unna`}
        </Text>
      </View>
    );

  },

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: 'Festkart'}}
          leftButton={{
            title: 'Lukk',
            tintColor: '#FF0055',
            handler: () => {
            this.props.navigator.pop();
          }}}
          />
        {this.renderMap()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mapView: {
    flex: 1
  },
  bottomView: {
    height: 70,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  distanceText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '500',
  }
});

function select(store) {
  return {
    userLocation: {
      latitude: store.location.latitude,
      longitude: store.location.longitude
    }
  }
}
module.exports = connect(select)(PartyMap);
