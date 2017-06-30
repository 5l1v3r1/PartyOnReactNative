import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import timeago from 'timeago.js';
const ProfilePic = require('../../commons/profilepic');

module.exports = React.createClass({
  render() {
    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
        >

        <View style={styles.iconWrapper}>
          {this.renderBall()}
          <ProfilePic url={this.props.rowData.profile.image} />
        </View>

        <View style={styles.middleWrapper}>
          <View style={styles.topWrapper}>
            <View style={styles.usernameWrapper}>
              <Text style={styles.usernameText}>{`${this.props.rowData.profile.firstname} ${this.props.rowData.profile.lastname}`}</Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.timestamp}>{this.convertTimestampToReadable(this.props.rowData.entry.timestamp)}</Text>
            </View>
          </View>
          <View style={styles.botWrapper}>
            <Text style={[styles.message, this.unreadStyle()]}>
              {this.checkMessageLength(this.props.rowData.preview)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },

  unreadStyle() {
    if (this.props.rowData.status === 'unread') {
      return {
        fontWeight: 'bold'
      }
    }
  },

  checkMessageLength(text) {
    if (Platform.OS == 'ios') {
      let splitted = text.split('\n');
      if (splitted.length > 1) {
        return splitted[0] + '...'
      }

      if (text.length >= 40) {
        let message = text.slice(0, 39);
        return message + '...';
      }

    }
    return text;
  },

  convertTimestampToReadable(timestamp) {
    let time = `${timestamp}000`;
    return timeago().format(time); // will get '11 hours ago'
  },

  renderBall() {
    const { status } = this.props.rowData;
    if (status === 'unread') {
      return <View style={styles.ball}></View>
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconWrapper: {
    flex: 1.4,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  ball: {
    width: 10,
    height: 10,
    marginRight: 4,
    borderRadius: 20,
    backgroundColor: '#3392FF'
  },
  middleWrapper: {
    flex: 5,
  },
  topWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  botWrapper: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 5,
    justifyContent: 'flex-start'
  },
  usernameWrapper: {
    flex: 2,
    paddingLeft: 5,
    justifyContent: 'flex-end',
  },
  usernameText: {
    fontSize: 16,
    color: '#030303'
  },
  message: {
    color: '#424242',
    fontSize: 14,
  },
  timestamp: {
    color: '#8F8E94',
    fontSize: 12
  },
  dateWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
});
