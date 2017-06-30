import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TabBarIOS,
  StatusBar,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Dimensions,
  PixelRatio
} from 'react-native';

import OneSignal from 'react-native-onesignal';
const strings = require('../../strings/strings');

const Messages = require('../tabs/messages/messages');
const Home = require('../tabs/home/home');
const Profile = require('../tabs/profile/profile');
const Shouts = require('../tabs/shouts/shouts');
const {height, width} = Dimensions.get('window');

var { connect } = require('react-redux');
var { switchTab,
  getCurrentPosition,
  setChatCount,
  setNotificationCount,
  addChatEntryAction,
  setMessageStatusUnread,
  toggleBarStyle } = require('../../actions');

const closeIcon = require('../../resources/close-icon.png');
const createIcon = require('../../resources/tabs/create@2x.png');

var pendingNotifications = [];

var Root = React.createClass({

  getInitialState() {
    return {
      overlay: false,
      heightAnim: new Animated.Value(0),
      imageIsShowing: false,
      image: '',
      caption: '',
      captionPosition: null,
    }
  },

  configureOneSignal() {
    OneSignal.configure({
      onNotificationReceived: (notification) => {
        console.log('NOTIFICATION RECIEVED: ', notification);

        let data = notification.payload.additionalData;

        if (data.route === 'chat') {
          // SET BADGE COUNT ON CHAT AND MAYBE PLAY SOUND?!
          // SET PREVIEW MESSAGE TO BE NOTIFICATION PAYLOAD
          this.props.dispatch(setChatCount(this.props.chatCount + 1));
          this.props.dispatch(setMessageStatusUnread(data.chat_id));
          this.props.dispatch(addChatEntryAction(data.chat_id, data.message));
        }

        if (data.route === 'profile') {
          // SET BADGE COUNT ON NOTIFICATIONS
          this.props.dispatch(setNotificationCount(this.props.notifications += 1));
        }
      },
      onNotificationOpened: (notification) => {
          console.log('NOTIFICATION OPENED: ', notification);
          let data = notification.notification.payload.additionalData;

          if (!notification.isAppInFocus && data.route === 'chat') {
            this.props.dispatch(setChatCount(this.props.chatCount + 1));
            if (this.props.navigator) {
              this.props.dispatch(switchTab('chat'));
              this.props.navigator.push({
                name: 'chat',
                chatId: data.chat_id,
                profile: data.profile
              });
            }
          }

          if (!notification.isAppInFocus && data.route === 'profile') {
            if (this.props.navigator) {
              this.props.dispatch(switchTab('profile'));
              this.props.navigator.push({name: 'notifications'});
            }
          }
      }
    });
  },

  componentDidMount() {
    console.log('Root did mount');
    this.configureOneSignal();
    this.props.dispatch(getCurrentPosition())
      .catch((error) => {
        alert('You have to have location enabled to view the feed');
      });
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

  createPress() {
    if (this.state.overlay) {
      console.log('Hide overlay true');
      this.setState({
        overlay: false,
        createIcon: closeIcon
      });
      Animated.spring(          // Uses easing functions
       this.state.heightAnim,    // The value to drive
       {toValue: 0}            // Configuration
     ).start();
    } else {
      console.log('Hide overlay false');
      this.setState({overlay: true});
      Animated.spring(          // Uses easing functions
       this.state.heightAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();
    }

  },

  getStyle() {
    return [
      styles.overlay,
      {
        transform: [
          {translateX: this.state.heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [width, -width, ]
          })}
        ]
      }
    ];
  },

  renderOverlay() {
      return (
        <Animated.View style={this.getStyle()}>
          <TouchableOpacity
            onPress={() => this.onNewShoutoutPress()}
            style={styles.leftWrapper}>
            <View style={styles.leftWrapper}>
              <Image
                style={styles.overlayImage}
                source={require('../../resources/shoutout-white.png')}/>
              <Text style={styles.overlayText}>{strings.newShoutout}</Text>
            </View>
          </TouchableOpacity>

          <View style={{width: 1, backgroundColor: 'white'}}/>
          <TouchableOpacity
            onPress={() => this.onCreateEventPress()}
            style={styles.rightWrapper}>
            <View style={styles.rightWrapper}>
              <Image style={styles.overlayImage} source={require('../../resources/cup-white.png')}/>
              <Text style={styles.overlayText}>{strings.newParty}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
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

  onNewShoutoutPress() {
    this.props.navigator.push({name: 'shoutout'});
    this.setState({
      overlay: false,
      createIcon: closeIcon
    });
    Animated.spring(          // Uses easing functions
     this.state.heightAnim,    // The value to drive
     {toValue: 0}            // Configuration
   ).start();
  },

  onCreateEventPress() {
    this.props.navigator.push({name: 'event'});
    this.setState({
      overlay: false,
      createIcon: closeIcon
    });
    Animated.spring(          // Uses easing functions
     this.state.heightAnim,    // The value to drive
     {toValue: 0}            // Configuration
   ).start();
  },

  render() {
    if (Platform.OS === 'android') {
      if (!this.props.city) {
        return (
            <ActivityIndicator
              style={styles.activityIndicator}
              size='large'
              color='#FF0055'/>
        );
      } else {
        return (
          <View style={styles.container}>
            <TabBar/>
          </View>
        );
      }

    } else {
      return(
        <View style={styles.container}>
        <TabBarIOS
        tintColor='#FF0055'
        translucent={true}
        barTintColor='white'
        >
    <TabBarIOS.Item
      icon={require('../../resources/tabs/home@2x.png')}
      selected={this.props.tab === 'home'}
      onPress={() => {
        this.props.dispatch(switchTab('home'));
      }}>
      {this._renderContent()}
    </TabBarIOS.Item>
    <TabBarIOS.Item
      icon={require('../../resources/tabs/shout@2x.png')}
      selected={this.props.tab === 'shouts'}
      onPress={() => {
        this.props.dispatch(switchTab('shouts'));
      }}>
      {this._renderContent()}
    </TabBarIOS.Item>
    <TabBarIOS.Item
      icon={this.state.overlay ? closeIcon : createIcon}
      onPress={() => {
        this.createPress();
      }}>
    </TabBarIOS.Item>
    <TabBarIOS.Item
      icon={require('../../resources/tabs/inbox@2x.png')}
      selected={this.props.tab === 'chat'}
      badge={this.renderChatBadge()}
      onPress={() => {
        this.props.dispatch(switchTab('chat'));
      }}>
      {this._renderContent()}
    </TabBarIOS.Item>
    <TabBarIOS.Item
      icon={require('../../resources/tabs/profile@2x.png')}
      badge={this.renderNotificationBadge()}
      selected={this.props.tab === 'profile'}
      onPress={() => {
        this.props.dispatch(switchTab('profile'));
      }}>
      {this._renderContent()}
    </TabBarIOS.Item>
    </TabBarIOS>
    {this.renderFullImage()}
    {this.renderOverlay()}
    </View>
      );
    }
  },

  renderNotificationBadge() {
    if (this.props.notifications > 0) {
      return this.props.notifications
    } else {
      return;
    }
  },

  renderChatBadge() {
    if (this.props.chatCount > 0) {
      return this.props.chatCount
    } else {
      return;
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
    fontSize: 18,
    position: 'absolute',
    left: 0,
    padding: 5,
    width: 140,
    //maxHeight: 130,
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
    city: store.location.city,
    notifications: store.user.notifications,
    chatCount: store.chats.unreadCount
  }
}

module.exports = connect(select)(Root);
