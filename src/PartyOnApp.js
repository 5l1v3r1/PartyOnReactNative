import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Platform,
  ActivityIndicator,
  Text,
  StatusBar,
} from 'react-native';

var { connect } = require('react-redux');
var PartyOnNavigator = require('./PartyOnNavigator');

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;

var {checkLoginActionCreator} = require('./actions');

var PartyOnApp = React.createClass({

  componentWillMount() {
    this.props.dispatch(checkLoginActionCreator());
  },

  render() {
    if (!this.props.initialRoute) {
      return (
          <ActivityIndicator
            style={styles.activityIndicator}
            size='large'
            color='#FF0055'/>
      );
    }

    return(
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle={this.props.barStyle}/>
        <PartyOnNavigator/>
      </View>
    );

  }

});

var styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});

function select(store) {
  return {
    initialRoute: store.navigation.initialRoute,
    barStyle: store.navigation.barStyle
  };
}

module.exports = connect(select)(PartyOnApp);
