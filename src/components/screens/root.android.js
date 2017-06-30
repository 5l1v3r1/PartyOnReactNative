import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TabBarIOS,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Dimensions,
  PixelRatio
} from 'react-native';

const strings = require('../../strings/strings');
import OneSignal from 'react-native-onesignal';
const Messages = require('../tabs/messages/messages');
const Home = require('../tabs/home/home');
const Profile = require('../tabs/profile/profile');
const Shouts = require('../tabs/shouts/shouts');
const {height, width} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
var { connect } = require('react-redux');
var { switchTab,
  getCurrentPosition,
  setMessageStatusUnread,
  setChatCount,
  setNotificationCount,
  addChatEntryAction,
  toggleBarStyle,
  requestLocationPermissions
 } = require('../../actions');

const closeIcon = require('../../resources/close-icon.png');
const createIcon = require('../../resources/tabs/create@2x.png');
import AndroidTabBar from '../commons/tab-bar'


var Root = React.createClass({

  getInitialState() {
    return {
      overlay: false,
      heightAnim: new Animated.Value(0),
      imageIsShowing: false,
      captionPosition: 40,
      image: '',
      caption: ''
    }
  },

  _renderContent() {
    switch (this.props.tab) {
      case 'chat':
        return <Messages navigator={this.props.navigator}/>
        break;
      case 'home':
        if (!this.props.city) {
          return (
              <ActivityIndicator
                style={styles.activityIndicator}
                size='large'
                color='#FF0055'/>
          );
        }
        return <Home navigator={this.props.navigator}/>
        break;
      case 'profile':
        return <Profile notifications={this.props.notifications} navigator={this.props.navigator}/>
        break;
      case 'shouts':
        return <Shouts
          onImageHide={() => this.onImageHide()}
          onImagePress={(shoutout) => this.onImagePress(shoutout)}
          navigator={this.props.navigator}/>
        break;
    }
  },

  componentDidMount() {
    this.onNotificationOpened();
  },

  onNotificationOpened() {
    OneSignal.configure({
      onNotificationOpened: (message, data, isActive) => {
          var notification = {message: message, data: data, isActive: isActive};
          console.log('NOTIFICATION OPENED: ', notification);

          if (notification.isActive && notification.data.route === 'chat') {
            // SET BADGE COUNT ON CHAT AND MAYBE PLAY SOUND?!
            // SET PREVIEW MESSAGE TO BE NOTIFICATION PAYLOAD
            this.props.dispatch(setChatCount(this.props.chatCount += 1));
            this.props.dispatch(setMessageStatusUnread(notification.data.chat_id));
            this.props.dispatch(addChatEntryAction(notification.data.chat_id, notification.data.message));
          }

          if (!notification.isActive && notification.data.route === 'chat') {
            if (this.props.navigator) {
              this.props.dispatch(switchTab('chat'));
              this.props.navigator.push({
                name: 'chat',
                chatId: notification.data.chat_id,
                profile: notification.data.profile
              });
            }
          }

          if (notification.isActive && notification.data.route === 'profile') {
            // Set notification badge
            this.props.dispatch(setNotificationCount(this.props.notifications += 1));
          }

          if (!notification.isActive && notification.data.route === 'profile') {
            if (this.props.navigator) {
              // CUSTOM LOGIC FOR ANDROID
              this.props.dispatch(switchTab('profile'));
              this.props.navigator.push({name: 'notifications'});
            }
          }
      }
    });
  },

  // Imagepress from shouts screen
  onImagePress(shoutout) {
    this.setState({
      imageIsShowing: true,
      image: shoutout.image,
      caption: shoutout.text,
      captionPosition: shoutout.caption_position,
      overlay: false,
      createIcon: closeIcon
    });
    Animated.spring(          // Uses easing functions
     this.state.heightAnim,    // The value to drive
     {toValue: 0}            // Configuration
   ).start();
  },

  renderFullImage() {
    if (this.state.imageIsShowing) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({imageIsShowing: false})}
          >
          <Image
            style={styles.fullImage}
            source={{uri: this.state.image}}>
              {this.renderImageCaption()}
          </Image>
        </TouchableWithoutFeedback>
      );
    }
    return;
  },

  renderImageCaption() {
    if (this.state.caption.length > 0) {
      return (
        <Text style={[styles.imageCaption, {top: (this.state.captionPosition * height) / 100}]}>{this.state.caption}</Text>
      );
    }
  },

  render() {
    return(
      <View style={styles.container}>
        <ScrollableTabView
          tabBarPosition={'bottom'}
          ref={"Tabs"}
          onChangeTab={(i, ref) => this.onChangeTab(i, ref)}
          page={this.props.tabIndex}
          renderTabBar={() => <AndroidTabBar chatCount={this.props.chatCount} notificationCount={this.props.notifications}/>}
          >
          <Home navigator={this.props.navigator} tabLabel="Home"/>
          <Shouts
            onImageHide={() => this.onImageHide()}
            onImagePress={(shoutout) => this.onImagePress(shoutout)}
            navigator={this.props.navigator}
            tabLabel="Shouts"/>
          <Messages navigator={this.props.navigator} tabLabel="Chat"/>
          <Profile notifications={this.props.notifications} navigator={this.props.navigator} tabLabel="Profile"/>
        </ScrollableTabView>
        {this.renderFullImage()}
      </View>
    );
  },

  onChangeTab(i, ref) {

    switch (i.i) {
      case 0:
        this.props.dispatch(switchTab('home'));
        break;
      case 1:
        this.props.dispatch(switchTab('shouts'));
        break;
      case 2:
        this.props.dispatch(switchTab('chat'));
        break;
      case 3:
        this.props.dispatch(switchTab('profile'));
        break;
    }
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
  overlay: {
    height: 70,
    position: 'absolute',
    bottom: 50,
    width: width,
    left: width,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: '#FF0055'
  },
  leftWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  overlayImage: {
    margin: 5
  },
  imageCaption: {
    position: 'absolute',
    fontSize: 18,
    padding: 5,
    left: 0,
    width: width / 2,
    color: 'white',
    backgroundColor: '#FF0055'
  },
  overlayText: {
    fontSize: 16,
    letterSpacing: -0.9,
    color: 'white',
    fontWeight: 'bold'
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  fullImage: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    width: width
  }
});

function select(store) {
  return {
    tab: store.navigation.tab,
    tabIndex: store.navigation.tabIndex,
    city: store.location.city,
    notifications: store.user.notifications,
    chatCount: store.chats.unreadCount
  }
}

module.exports = connect(select)(Root);
