import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

const { connect } = require('react-redux');
const strings = require('../../../../strings/strings');

var ActionsRow = React.createClass({
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.inviteButton} onPress={() => this.props.onInvitePress()}>
          <View style={styles.buttonWrapper}>
            <Image style={styles.icon} source={require('../../../../resources/invite_people_ic@2x.png')} />
            {this.renderInviteText()}
          </View>
        </TouchableOpacity>
        {this.renderDeleteButton()}
      </View>
    );
  },

  renderDeleteButton() {
    if (this.props.canDelete) {
      return (
        <TouchableOpacity style={styles.inviteButton} onPress={() => this.props.onDeletePress()}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.text}>{strings.deleteParty}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  },

  renderInviteText() {
    return <Text style={styles.text}>{strings.inviteFriends}</Text>
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  inviteButton: {
    borderRadius: 20,
    backgroundColor: '#FF0055',
    flex: 1,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    flex: 3.5,
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});

function select(store) {
  return {
    invites: store.event.invites
  }
}

module.exports = connect(select)(ActionsRow);
