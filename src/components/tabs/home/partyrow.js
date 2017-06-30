import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const ProfilePic = require('../../commons/profilepic');
const TimeText = require('../../commons/time-text');
const DistanceText = require('../../commons/distance-text');
const RoundedButtonSolid = require('../../commons/rounded-button-solid');
import LinearGradient from 'react-native-linear-gradient';
const SCREEN_WIDTH = require('Dimensions').get('window').width;
const { joinPartyActionCreator } = require('../../../actions');
const strings = require('../../../strings/strings');

module.exports = React.createClass({

  render() {
    return(
      <TouchableWithoutFeedback onPress={this.props.onPress} style={styles.container}>
        <View style={styles.container}>
          <Image style={styles.containerImage} source={this.props.party.image ? {uri: this.props.party.image} : require('../../../resources/Cup.png')}>
            <LinearGradient colors={['rgba(0,0,0,.25)', 'rgba(0,0,0,.12)', 'transparent']}>
              <View style={styles.topWrapper}>
                {this.renderCreator()}
                {this.renderButton()}
              </View>
            </LinearGradient>
            <View style={styles.middleWrapper}></View>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,.12)', 'rgba(0,0,0,.25)']}>
              <View style={styles.bottomWrapper}>
                <View style={styles.timePlaceWrapper}>
                  <TimeText color={'white'} text={new Date(this.props.party.date).toDateString()}/>
                  <DistanceText color={'white'} text={this.renderDistanceText()}/>
                </View>
                <View style={styles.descriptionWrapper}>
                  <Text style={styles.captionText}>{this.props.party.title}</Text>
                </View>
              </View>
            </LinearGradient>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  renderDistanceText() {
    let { distance } = this.props.party;
    switch (distance) {
      case 'distanceVeryClose':
        return strings.distanceVeryClose
        break;
      case 'distanceClose':
        return strings.distanceClose
        break;
        default:
        return `${distance} ${strings.away}`;
    }

  },

  renderCreator() {
    const { firstname, lastname, image } = this.props.party.creator;
    return (
      <TouchableWithoutFeedback style={styles.userWrapper} onPress={this.props.onUserPress}>
        <View style={styles.userWrapper}>
          <ProfilePic url={image} size={'small'}/>
          <Text style={styles.usernameText}>{`${firstname} ${lastname}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  },

  renderButton() {
    const { profile_id } = this.props.party;
    if (profile_id !== this.props.profileId) {
      if (this.props.party.join_status === 'none') {
        return (
          <View style={styles.buttonWrapper}>
            <RoundedButtonSolid
              isLoading={this.props.isLoading}
              buttonText={`${strings.join}`}
              onPress={this.props.onJoinPress}
              />
          </View>
        );
      } else if (this.props.party.join_status === 'pending') {
        return (
          <View style={styles.buttonWrapper}>
            <RoundedButtonSolid
              isLoading={this.props.isLoading}
              buttonText={`${strings.pending}`}
              onPress={this.props.onJoinPress}
              />
          </View>
        );
      } else if (this.props.party.join_status === 'attending') {
        return (
          <View style={styles.buttonWrapper}>
            <RoundedButtonSolid
              isLoading={this.props.isLoading}
              attending={true}
              buttonText={`${strings.attending}`}
              onPress={this.props.onJoinPress}
              />
          </View>
        );
      } else if (this.props.party.join_status === 'invited') {
        return (
          <View style={styles.buttonWrapper}>
            <RoundedButtonSolid
              isLoading={this.props.isLoading}
              attending={true}
              buttonText={`${strings.inviteCaps}`}
              onPress={this.props.onJoinPress}
              />
          </View>
        );
      }
      else {
      return;
      }
    }
  },
});

const styles = StyleSheet.create({
  container: {
    height: 250,
    flex: 1,
    marginBottom: 5
  },
  containerImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: 250
  },
  topWrapper: {
    flex: 3,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 9
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2
  },
  usernameText: {
    marginLeft: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0.05,
    fontWeight: '500',
    color: 'white'
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  joinButton: {
    borderRadius: 15,
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#FF0859'
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  middleWrapper: {
    flex: 3.5,
  },
  bottomWrapper: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  timePlaceWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5
  },
  descriptionWrapper: {
    padding: 8,
    justifyContent: 'flex-end'
  },
  captionText: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    letterSpacing: 0.09,
    fontWeight: 'bold'
  }
});
