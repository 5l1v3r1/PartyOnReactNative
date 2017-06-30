import React from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text
} from 'react-native';

const Swipeout = require('react-native-swipeout');
const NavigationBar = require('react-native-navbar');
const { getPartyGuests } = require('../../../api/PartyOnAPI');
const ProfilePic = require('../../commons/profilepic');
import { connect } from 'react-redux';
const { toggleBarStyle, removePartyGuestActionCreator } = require('../../../actions');
const strings = require('../../../strings/strings');
import TimerMixin from 'react-timer-mixin';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const PartyGuests = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      guests: []
    }
  },

  componentWillMount() {
    this.props.dispatch(toggleBarStyle());
    this.setTimeout(
      () => {
        getPartyGuests(this.props.data.partyId).then(
          (response) => {
            console.log('response: ', response);
            this.setState({
              guests: response
            });
          }
        );
      }, 500
    );
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
  },

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={{title: strings.guests}}
          leftButton={{title: strings.close, tintColor: '#FF0055', handler: () => this.close()}}
          />
        {this.renderList()}
      </View>
    );
  },

  renderList() {
    if (this.state.guests.length === 0) {
      return (
        <ActivityIndicator
          style={{flex: 1}}
          size='large'
          color='#FF0055'/>
      );
    } else {
      return (
        <ListView
          dataSource={ds.cloneWithRows(this.state.guests)}
          enableEmptySections={true}
          renderRow={(rowData, sectionID, rowID) =>
            <GuestRow
              guest={rowData}
              profileId={this.props.profileId}
              creatorId={this.props.data.creatorId}
              onRemoveGuest={() => this.onRemoveGuest(rowData, rowID)}
              onRowPress={() => this.onRowPress(rowData)}/>}
          />
      );
    }
  },

  onRemoveGuest(guest, rowID) {
    this.props.dispatch(removePartyGuestActionCreator(this.props.profileId, this.props.data.partyId, guest.profile_id)).then(
      (response) => {
        let newArray = [];
        for (var i = 0; i < this.state.guests.length; i++) {
          if (i != rowID) {
            newArray.push(this.state.guests[i]);
          }
        }
        this.setState({guests: newArray})
      }
    )
  },

  onRowPress(guest) {
    if (this.props.profileId !== guest.profile_id) {
      this.props.navigator.push({name: 'userProfile', data: guest});
    } else {
      this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
    }
  },

  close() {
    this.props.navigator.pop();
  }

});


let GuestRow = React.createClass({
  render() {
    return this.renderRow();
  },

  renderRow() {
    const swipeoutButtons = [
      {
        // component:
        //   <Text style={styles.swipeButtonText}>Avslå</Text>
        // ,
        text: 'REMOVE GUEST',
        backgroundColor: '#e74c3c',
        color: 'white',
        onPress: () => this.props.onRemoveGuest()//this.props.onRemoveGuest()
      }
    ];

    if (this.props.creatorId === this.props.profileId) {
      return (
        <Swipeout
        autoClose={true}
        right={swipeoutButtons}>
          <TouchableOpacity
            onPress={() => this.props.onRowPress()}
            style={[styles.guestRow, {backgroundColor: 'white'}]}
          >
            <ProfilePic
              style={styles.image}
              url={this.props.guest.image}
              />
            <Text style={styles.name}>
              {`${this.props.guest.firstname} ${this.props.guest.lastname}`}
            </Text>
          </TouchableOpacity>
        </Swipeout>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.props.onRowPress()}
          style={[styles.guestRow, {backgroundColor: 'white'}]}
          >
          <ProfilePic
            style={styles.image}
            url={this.props.guest.image}
            />
          <Text style={styles.name}>
            {`${this.props.guest.firstname} ${this.props.guest.lastname}`}
          </Text>
        </TouchableOpacity>
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  guestRow: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a4a4a',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  }
});

function select(store) {
  return {
    profileId: store.user.profileId
  }
}

module.exports = connect(select)(PartyGuests);
