import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity
} from 'react-native';

const ProfilePic = require('../../commons/profilepic');
const RoundedButton = require('../../commons/rounded-button');
const Swipeout = require('react-native-swipeout');
const strings = require('../../../strings/strings');

module.exports = React.createClass({
  getInitialState() {
    let accepted;
    if (this.props.notification.type === 'join' && this.props.notification.action[0].name === 'Attending') {
      accepted = true;
    } else {
      accepted = false;
    }
    return {
      accepted: accepted,
    }
  },
  render() {
    const swipeoutButtons = [
      {
        // component:
        //   <Text style={styles.swipeButtonText}>Avslå</Text>
        // ,
        text: strings.decline,
        backgroundColor: '#e74c3c',
        color: 'white',
        onPress: () => console.log('declinerequest')//this.props.onDeclineRequestClick()
      }
    ];
    const { type, text, action } = this.props.notification;
    if (type === 'join') {
      return(
        <Swipeout
          right={swipeoutButtons}
          >
        <View style={[styles.container, {backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={() => this.props.onUserPress()}>
          <ProfilePic
            style={styles.profilepic}
            url={action[0].params.profile.image || ''}
            />
        </TouchableOpacity>
          {this.renderText()}
          <RoundedButton
            style={styles.button}
            accepted={this.state.accepted}
            text={strings.accept}
            onPress={() => this.onAcceptRequestClick()}/>
        </View>
        </Swipeout>
      );
    }

    if (type === 'join_accepted') {
      return (
        <View
          style={[styles.container, {backgroundColor: '#FF0055'}]}>
          {this.renderText()}
          <RoundedButton
            style={styles.button}
            text={strings.showParty}
            onPress={() => this.props.onShowPartyClick()}/>
        </View>
      );
    }

    if (type === 'shoutout_like') {
      return (
        <View style={[styles.container, {backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={() => this.props.onUserPress(type)}>
          <ProfilePic
            style={styles.profilepic}
            url={action[0].profile.image || ''}
            />
        </TouchableOpacity>
          {this.renderText()}
          <RoundedButton
            style={styles.button}
            text={strings.showShoutout}
            onPress={() => this.props.onShowShoutoutClick()}/>
        </View>
      );
    }

    if (type === 'invite') {
      return (
        <View style={[styles.container, {backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={() => this.props.onUserPress()}>
          <ProfilePic
            style={styles.profilepic}
            url={action[0].params.profile.image || ''}
            />
        </TouchableOpacity>
          {this.renderText()}
          <RoundedButton
            style={styles.button}
            text={strings.showParty}
            onPress={() => this.props.onShowPartyClick(true)}/>
        </View>
      );
    }
  },

  renderText() {
    const { type, action } = this.props.notification;
    if (type === 'join') {
      return (
        <Text style={[styles.text]}>
          {`${action[0].params.profile.firstname} ${action[0].params.profile.lastname} ${strings.joinParty} ${action[0].params.party.title}`}
        </Text>
      );
    }

    if (type === 'join_accepted') {
      return (
        <Text style={[styles.text, {color: 'white'}]}>
          {`${strings.joinAccepted} ${action[0].party.title}`}
        </Text>
      );
    }

    if (type === 'shoutout_like') {
      return (
        <Text style={[styles.text]}>
          {this.props.notification.text}
        </Text>
      );
    }

    if (type === 'invite') {
      return (
        <Text style={[styles.text]}>
          {this.props.notification.text}
        </Text>
      );
    }

  },

  onAcceptRequestClick() {
    this.props.onAcceptRequestClick();
    this.setState({accepted: true});
  }

});

const styles = StyleSheet.create({
  container: {
    //height: 75,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  profilepic: {
    //flex: 0.2,
    height: 25,
    width: 25,
    marginRight: 8
  },
  text: {
    flex: 3,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    letterSpacing: -0.2
  },
  button: {
    flex: 1,
  },
  swipeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
