import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';


const NavigationBar = require('react-native-navbar');
const TimerMixin = require('react-timer-mixin');
const NotificationRow = require('./notifications-row');
const BackArrow = require('../../commons/backButtonNavItem');
const strings = require('../../../strings/strings');
const { connect } = require('react-redux');
const {
  loadNotificationsActionCreator,
  acceptJoinRequestActionCreator,
  declineJoinRequestActionCreator,
  readNotificationsActionCreator,
} = require('../../../actions');

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let Notifications = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      dataSource: ds.cloneWithRows(this.props.notifications),
      refreshing: false,
    };
  },

  componentDidMount() {
    this.setTimeout(() => {
      this.fetchNotifications();
    }, 300);
  },

  onRefresh() {
    this.fetchNotifications();
  },

  fetchNotifications() {
    this.setState({refreshing: true});
    this.props.dispatch(loadNotificationsActionCreator(this.props.profileId))
      .then(() => {
        this.setState({
          dataSource: ds.cloneWithRows(this.props.notifications),
          refreshing: false
        })
      })
      .then(() => {
        this.props.dispatch(readNotificationsActionCreator(this.props.profileId))
      });
  },

  render() {
    return(
      <View style={styles.container}>
        <NavigationBar
          title={{title: strings.myNotifications}}
          leftButton={<BackArrow onPress={() => {this.onBackPress()}}/>}
          />
        {this.renderContent()}
      </View>
    );
  },

  renderContent() {
    if(this.props.count === 0 && this.props.message === 'No notifications to display') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Text style={styles.errorText}>{this.props.message}</Text>
        </View>
      )
    } else if (this.props.count > 0 && this.props.message === 'Your notifications') {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              />
          }
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
          renderRow={(rowData, sectionID, rowID) =>
            <NotificationRow
              notification={rowData}
              onAcceptRequestClick={() => this.onAcceptRequestClick(rowID)}
              onDeclineRequestClick={() => this.onDeclineRequestClick(rowID)}
              onUserPress={(type) => this.onUserPress(rowData, type)}
              onShowPartyClick={(fromInvite) => this.onShowPartyClick(rowID, fromInvite)}
              onShowShoutoutClick={() => this.onShowShoutoutClick(rowID)}
              />}
          />
      )
    }
  },

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{backgroundColor: '#C8C7CC', height: 1, marginLeft: 25}}
        />
    );
  },

  onUserPress(notification, type) {
    console.log('NOTIFICATION: ', notification);
    if (type !== 'shoutout_like') {
      if (this.props.profileId !== notification.action[0].params.profile.profile_id) {
        this.props.navigator.push({name: 'userProfile', data: notification.action[0].params.profile});
      } else {
        this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
      }
    } else {
      if (this.props.profileId !== notification.action[0].profile.profile_id) {
        this.props.navigator.push({name: 'userProfile', data: notification.action[0].profile});
      } else {
        this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
      }
    }

  },

  onAcceptRequestClick(rowID) {
    let params = this.props.notifications[rowID].action[0].params;
    this.props.dispatch(acceptJoinRequestActionCreator(params))
      .then((response) => {
        if (response.success) {

        }
      })
  },

  onShowShoutoutClick() {
    this.props.navigator.push({name: 'myProfile', data: {segment: 'shoutouts'}});
  },

  onDeclineRequestClick(rowID) {
    let params = this.props.notifications[rowID].action[0].params;
    this.props.dispatch(declineJoinRequestActionCreator(params));
  },

  onShowPartyClick(rowID, fromInvite) {
    if (fromInvite) {
      this.props.navigator.push({name: 'genericParty', data: {partyId: this.props.notifications[rowID].action[0].params.party.party_id}});
    } else {
      this.props.navigator.push({name: 'genericParty', data: {partyId: this.props.notifications[rowID].action[0].party.party_id}});
    }

  },

  onBackPress() {
    this.props.navigator.pop();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentWrapper: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    letterSpacing: 1.6
  }
});

function select(store) {
  return {
    notifications: store.notifications.notifications,
    count: store.notifications.count,
    message: store.notifications.message,
    profileId: store.user.profileId
  }
}

module.exports = connect(select)(Notifications);
