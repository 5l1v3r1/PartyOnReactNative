import React, {Component, PropTypes} from 'react';
import TimerMixin from 'react-timer-mixin';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
const strings = require('../../../strings/strings');

const { likeShoutoutActionCreator, dislikeShoutoutActionCreator} = require('../../../actions');
import ActionSheet from '@exponent/react-native-action-sheet';
const ProfilePic = require('../../commons/profilepic');
const TimeText = require('../../commons/time-text');
const DistanceText = require('../../commons/distance-text');
const RoundedButton = require('../../commons/rounded-button');
const { BlurView } = require('react-native-blur');
const { connect } = require('react-redux');

const { likeShoutout, dislikeShoutout } = require('../../../api/PartyOnAPI');

const Heart = require('../../commons/Heart');

class ShoutoutRow extends Component {

  static contextTypes = {
    actionSheet: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.shoutout.likes,
      liked: this.props.shoutout.liked,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.liked !== this.props.shoutout.liked || nextProps.likes !== this.props.shoutout.likes) {
      this.setState({
        liked: nextProps.shoutout.liked,
        likes: nextProps.shoutout.likes
      });
    }
  }

  render() {
    if (this.props.shoutout.image != null) {
      return (
        <TouchableWithoutFeedback
          style={styles.imageRowButton}
          onPress={() => this.props.onImagePress()}
          >
          <Image
            source={{uri: this.props.shoutout.image}}
            ref={this.setViewRef}
            style={styles.container}>
            {this.renderBlurView()}
          </Image>
        </TouchableWithoutFeedback>
      );
    }
    return(
      <View style={styles.container}>
        <View style={styles.topWrapper}>
            {this.renderCreator()}
            {this.renderOptionView()}
        </View>

        <View style={styles.middleWrapper}>
          <Text style={styles.captionText}>{this.props.shoutout.text}</Text>
        </View>

        <View style={styles.bottomWrapper}>
          <View
            style={styles.likeWrapper}
            >
            <Heart liked={this.state.liked} onLikePress={() => this.onLikePress()}/>
            <Text style={[styles.likesCount, this.state.liked ? {color: '#ff0055'} : {color: '#9B9B9B'}]}>{this.state.likes}</Text>
          </View>
          <View style={styles.timePlaceWrapper}>
            <TimeText text={this.props.shoutout.time_ago}/>
            {this.renderDistance()}
          </View>
        </View>
      </View>
    );
  }

  renderBlurView() {
    if (Platform.OS === 'ios') {
      return (
        <BlurView blurType="dark" style={styles.container}>
          <View style={styles.topWrapper}>
              {this.renderCreator(true)}
              {this.renderOptionView()}
          </View>

          <View
            style={styles.middleWrapper}>
            <Text style={{color: 'white', fontSize: 18, fontStyle: 'italic'}}>{strings.tapToLook}</Text>
          </View>

          <View style={styles.bottomWrapper}>
            <View
              style={styles.likeWrapper}
              >
              <Heart liked={this.state.liked} onLikePress={() => this.onLikePress()}/>
              <Text style={[styles.likesCount, this.state.liked ? {color: '#ff0055'} : {color: 'white'}]}>{this.state.likes}</Text>
            </View>
            <View style={styles.timePlaceWrapper}>
              <TimeText color={'white'} text={this.props.shoutout.time_ago}/>
              {this.renderDistance(true)}
            </View>
          </View>
        </BlurView>
      );
    } else {
      return(
        <TouchableWithoutFeedback onPress={() => this.props.onImagePress()}>
          <View
            style={styles.containerAndroid}
            >
            <View style={styles.topWrapper}>
                {this.renderCreator(true)}
                {this.renderOptionView()}
            </View>

            <View
              style={styles.middleWrapper}>
              <Text style={{color: 'white', fontSize: 18, fontStyle: 'italic'}}>{strings.tapToLook}</Text>
            </View>

            <View style={styles.bottomWrapper}>
              <View
                style={styles.likeWrapper}
                >
                <Heart liked={this.state.liked} onLikePress={() => this.onLikePress()}/>
                <Text style={[styles.likesCount, this.state.liked ? {color: '#ff0055'} : {color: 'white'}]}>{this.state.likes}</Text>
              </View>
              <View style={styles.timePlaceWrapper}>
                <TimeText color={'white'} text={this.props.shoutout.time_ago}/>
                {this.renderDistance(true)}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderDistance(color) {
    let distanceText;
    switch (this.props.shoutout.distance) {
      case 'distanceVeryClose':
        distanceText = strings.distanceVeryClose
        break;
      case 'distanceClose':
        distanceText = strings.distanceClose
        break;
      case undefined:
        distanceText = this.props.shoutout.location
        break;
        default:
        distanceText = this.props.shoutout.distance;
    }
    if (color) {
      return (
        <DistanceText color={'white'} text={`${distanceText}`}/>
      );
    }
    return (
      <DistanceText text={`${distanceText}`}/>
    );
  }

  // setViewRef(ref) {
  //   this.setState({
  //     viewRef: findNodeHandle(ref)
  //   });
  // }

  onLikePress() {
    this.props.onLikePress();
    if (this.state.liked) {
      let count = this.state.likes - 1;
      this.setState({
        likes: count,
        liked: false
      });
    } else {
      let count = this.state.likes + 1;
      this.setState({
        likes: count,
        liked: true
      });
    }
  }

  renderCreator(image) {
    const { firstname, lastname, fbid } = this.props.shoutout.profile;
    return (
      <TouchableWithoutFeedback style={styles.userWrapper} onPress={() => this.props.onUserPress()}>
        <View style={styles.userWrapper}>
          <ProfilePic url={this.props.shoutout.profile.image} size={'small'}/>
          <Text style={[styles.usernameText, image ? {color: 'white'} : {color: '#4A4A4A'}]}>{`${firstname} ${lastname}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderOptionView() {
    return (
      <TouchableWithoutFeedback
      style={styles.optionView}
      onPress={() => this.showActionSheet()}
      >
        <View style={styles.dotWrapper}>
          <View style={styles.dot}/>
          <View style={styles.dot}/>
          <View style={styles.dot}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  showActionSheet() {
    let BUTTONS;
    let DESTRUCTIVE_INDEX;

    if (this.props.shoutout.profile.profile_id === this.props.profileId) {
      BUTTONS = [
        'Delete',
        'Cancel'
      ];
      DESTRUCTIVE_INDEX = 0;
    } else {
      BUTTONS = [
        'Report',
        'Cancel'
      ];
    }
    let CANCEL_INDEX = 1;

    this.context.actionSheet().showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: '#ff0055',
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        if (BUTTONS[0] === 'Delete') {
          this.props.onDeleteShoutout();
        } else if (BUTTONS[0] === 'Report') {
          this.props.onReportShoutout();
        }
      }
    });
  }

}

const styles = StyleSheet.create({
  container: {

  },
  containerAndroid: {
    backgroundColor: 'rgba(0,0,0,.70)'
  },
  topWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  userWrapper: {
    flex: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  usernameText: {

    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
  captionText: {
    color: '#4A4A4A',
    fontSize: 18,
  },
  middleWrapper: {
    padding: 10,
  },
  bottomWrapper: {
    paddingBottom: 5,
    flexDirection: 'row'
  },
  likeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    margin: 5
  },
  likesCount: {
    fontSize: 16,
    fontWeight: '200',
  },
  timePlaceWrapper: {
    flex: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  optionView: {
    flex: 1,
  },
  dotWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    width: 6,
    margin: 1,
    borderRadius: 3,
    backgroundColor: '#4A4A4A'
  },
  imageRowButton: {
    backgroundColor: 'cyan',
    borderColor: 'red',
    borderWidth: 2
  }

});

module.exports = ShoutoutRow;
