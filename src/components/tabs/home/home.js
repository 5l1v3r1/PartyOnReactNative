import React from 'react';

import {
  View,
  Text,
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const RightNavItem = require('../../commons/rightNavbarItem');
const strings = require('../../../strings/strings');
const Parties = require('./parties');
var { connect } = require('react-redux');


var HomeTab = React.createClass({

  render() {
    const titleConfig = {
      title: this.props.city,
      tintColor: '#424242'
    };
    return(
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          style={styles.navBar}
          rightButton={this.renderFilterButton()}
          leftButton={this.renderCreatePartyButton()}
          />
        {this.renderContent()}
      </View>
    );
  },

  renderFilterButton() {
    return {
      title: 'Filter',
      tintColor: '#FF0859',
      handler: () => this.props.navigator.push({name: 'filter'}),
    };
  },

  renderCreatePartyButton() {
    if (Platform.OS === 'android') {
      return {
        title: strings.createParty,
        tintColor: '#ff0055',
        handler: () => this.props.navigator.push({name: 'event'})
      }
    }
  },

  renderContent() {
    return <Parties navigator={this.props.navigator}/>
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  }
});

function select(store) {
  return {
    city: store.location.city,
    barStyle: store.navigation.barStyle
  }
}

module.exports = connect(select)(HomeTab);
