import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native'

const NavigationBar = require('react-native-navbar');
const ProfileRow = require('./profile-row');
const Heart = require('../../commons/Heart');
const strings = require('../../../strings/strings');
const { connect } = require('react-redux');

var Profile = React.createClass({

  render() {
    const titleConfig = {
      title: strings.me,
      tintColor: '#4A4A4A'
    };
    const statusBarConfig = {
      style: 'default',
      tintColor: 'white'
    };
    const rightButtonConfig = {
      title: `${this.props.points} ${strings.points}`,
      tintColor: '#4A4A4A'
    };

    return(
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          style={styles.navBar}
          statusBar={statusBarConfig}
          rightButton={rightButtonConfig}
          />
        <ScrollView style={styles.scrollViewContainer}
          automaticallyAdjustContentInsets={false}>
          <ProfileRow
            resize={true}
            icon={require('../../../resources/profile-blue.png')}
            onPress={() => {
              this.onRowPress('myProfile');
            }}
            text={strings.myProfile} />
            <ProfileRow
              resize={true}
              notifications={this.props.notifications}
              icon={require('../../../resources/notifications.png')}
              onPress={() => {
                this.onRowPress('myNotifications');
              }}
              text={strings.myNotifications} />
          <ProfileRow
            icon={require('../../../resources/key.png')}
            onPress={() => {
              this.onRowPress('myAttendings')
            }}
            text={strings.myAttendings} />
          <ProfileRow
            onPress={() => {
              this.onRowPress('legal')
            }}
            text={strings.legal}/>
        </ScrollView>
      </View>
    );
  },

  onRowPress(route) {
    const { navigator } = this.props;
    switch (route) {
      case 'myProfile':
        navigator.push({name: 'myProfile', data: {segment: 'fester'}});
        break;
      case 'myAchievements':
        navigator.push({name: 'myAchievements'});
        break;
      case 'myNotifications':
        navigator.push({name: 'notifications'});
          break;
      case 'myAttendings':
        navigator.push({name: 'myAttendings'})
        break;
      case 'myShoutouts':
        navigator.push({name: 'myShoutouts'})
        break;
      case 'myParty':
        navigator.push({name: 'myParty'})
        break;
      case 'legal':
        navigator.push({name: 'legal'})
        break;
    }
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {

  },
  navBar: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  seperator: {
    height: 1,
    backgroundColor: 'gray'
  }
});

function select(store) {
  return {
    points: store.user.points
  }
}

module.exports = connect(select)(Profile)
