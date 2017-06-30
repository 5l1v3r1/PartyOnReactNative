import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';

import { geocodeAddressActionCreator } from '../../../../actions';

const strings = require('../../../../strings/strings');
import { connect } from 'react-redux';

let PlaceRow = React.createClass({
  getInitialState() {
    let initialRegion = {
      latitude: this.props.position.latitude,
      longitude: this.props.position.longitude,
      latitudeDelta: .003,
      longitudeDelta: .003,
    };

    return {
      pin: {
        longitude: this.props.position.latitude,
        latitude: this.props.position.longitude,
      },
      address: this.props.address,
      region: initialRegion,
      initialRegion: initialRegion,
    };
  },

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      },
      region: region
    });
    let position = {
      latitude: region.latitude,
      longitude: region.longitude
    };
    this.props.onRegionChangeComplete(position);
  },

  onChangeText(text) {
    this.setState({address: text})
    this.props.onChangeText(text);
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.icon} source={require('../../../../resources/Pin@2x.png')}/>
            <Text style={styles.titleText}>{strings.place}</Text>
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            region={this.state.region}
            initialRegion={this.state.initialRegion}
            liteMode={true}
            onRegionChangeComplete={this.onRegionChangeComplete}>
            <MapView.Marker
              coordinate={this.state.pin}
              image={require('../../../../resources/partypin-android@2x.png')}
              />
            </MapView>
            <View style={styles.addressWrapper}>
              <TextInput
                style={styles.addressInput}
                placeholder={this.props.hasError ? strings.missingAddress : strings.address}
                placeholderTextColor={this.props.hasError ? 'red' : 'gray'}
                onChangeText={(text) => this.onChangeText(text)}
                defaultValue={this.state.address}
                returnKeyType={'done'}
                onSubmitEditing={() => {
                  this.onGeocodeAddressPress()
                }}
                />
                <TouchableOpacity
                  style={[styles.pinButton, this.state.address.length > 0 ? {borderColor: '#ff0055'} : {borderColor: 'gray'}]}
                  disabled={
                    this.state.address.length > 0 ? false : true
                  }
                  onPress={() => {
                    this.onGeocodeAddressPress()
                  }}
                  >
                  {this.renderPinButton()}
                </TouchableOpacity>
              </View>
        </View>
        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            underlayColor={'white'}
            onPress={() => {
              this.setState({
                region: {
                  ...this.state.region,
                  latitude: this.props.location.latitude,
                  longitude: this.props.location.longitude
                }
              });
            }}
            style={styles.button}>
            <View style={styles.buttonWrapper}>
            <Image style={styles.buttonIcon} source={require('../../../../resources/navigation-icon@2x.png')}/>
            <Text style={styles.buttonText}>{strings.useCurrentLocation}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },

  renderPinButton() {
    if (this.state.isLoading) {
      return <ActivityIndicator style={{flex: 1}} size={'small'} color={'#ff0055'}/>
    } else {
      return (
        <Text style={[styles.pinButtonText, this.state.address.length > 0 ? {color: '#ff0055'} : {color: 'gray'}]}>
          📍
        </Text>
      );
    }
  },

  onGeocodeAddressPress() {
    this.setState({isLoading: true});
    this.props.dispatch(geocodeAddressActionCreator(this.state.address, this.props.location.city)).then(
      (result) => {
        this.setState({
          isLoading: false,
          region: {
            ...this.state.region,
            latitude: result[0].position.lat,
            longitude: result[0].position.lng
          }
        });
      }
    )
  }


});

const styles = StyleSheet.create({
  container: {
    height: 350,
    padding: 10,
  },
  topView: {
    flex: 1,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9B9B9B',
  },
  mapWrapper: {
    flex: 5.2,
  },
  bottomWrapper: {
    flex: 1,
    padding: 7,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#FF0055'
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500'
  },
  addressWrapper: {
    flexDirection: 'row',
    padding: 5,
  },
  addressInput: {
    flex: 4,
    height: 35,
    padding: 5,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  pinButton: {
    flex: 0.5,
    padding: 4,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinButtonText: {
    fontSize: 12,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1.2,
    borderRadius: 7,
  }
});

function select(store) {
  return {
    location: store.location
  }
}

module.exports = connect(select)(PlaceRow);
