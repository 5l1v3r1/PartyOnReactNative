import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions'
import BackArrow from '../commons/backButtonNavItem';

class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
        title={{title: 'Instillinger'}}
        />
        <View style={styles.viewWrapper}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutButtonText}>
            Logg ut
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  logout() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'login'}]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  viewWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#ff0055',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  }
});

function select(store) {
  return {

  }
}

module.exports = connect(select)(Settings);
