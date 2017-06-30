import React, {Component} from 'react';
import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  PixelRatio,
  AppState,
  Navigator,
} from 'react-native';

const GiftedMessenger = require('../messenger/GiftedMessenger');
const NavigationBar = require('react-native-navbar');
const BackArrow = require('../commons/backButtonNavItem');
import { connect } from 'react-redux';
const {
  createChatActionCreator,
  addChatEntryAction,
  createChat,
  setMessageStatusRead,
  readChatThreadActionCreator
} = require('../../actions');
const baseUrl = 'http://178.62.27.38/api/v1';
const {
  getChatThread,
  checkChatExists,
} = require('../../api/PartyOnAPI');

const Pusher = require('pusher-js/react-native');

var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
if (Platform.OS === 'android') {
  var STATUS_BAR_HEIGHT = 15;
}

class GiftedMessengerContainer extends Component {

  constructor(props) {
    super(props);

    this._isMounted = false;
    this._messages = [];

    this._pusher = new Pusher('6ddf4364c6b3b6972877', {
      cluster: 'eu',
      encrypted: true,
      authEndpoint: `${baseUrl}/chat/auth`
    });

    this.state = {
      messages: [],
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
      hasLodedEarlierOnce: false,
      channel: '',
      chatId: this.props.chatId,
      height: 33
    };

    this.unreadCount = 0;

  }

  componentDidMount() {
    this._isMounted = true;

    checkChatExists(this.props.profileId, this.props.profile.profile_id).then(
      (result) => {
        console.log('RESULT CHECK CHAT: ', result);
        if (result.message === 'Chat exsists') {
          console.log('CHAT ID: ', result.chat_id);
          this.setState({
            channel: this._pusher.subscribe(`private-${result.chat_id}`),
            chatId: result.chat_id
          });

          this.state.channel.bind('pusher:subscription_succeeded', () => {
            console.log('Successfully subbed');
          });

          this.state.channel.bind('client-message', (data) => {
            this.handleReceive(data);
          });

          this.getInitialMessages();
        }
      }
    )
  }

  componentWillUnmount() {
    this._isMounted = false;
    //this.state.channel.unsubscribe(`private-${this.state.chatId}`);
    this._pusher.disconnect();
  }

  getInitialMessages() {
    getChatThread(this.state.chatId, this.props.profileId).then(
      (result) => {
        let messages = [];
        for (item of result.entries) {
          let message = {
            text: item.body,
            entry_id: item.entry_id,
            name: `${item.profile.firstname} ${item.profile.lastname}`,
            image: {uri: item.profile.image},
            uniqueId: Math.round(Math.random() * 10000),
            profile: item.profile
          };

          if (item.profile.profile_id === this.props.profileId) {
            message.position = 'right'
          } else {
            message.position = 'left'
          }
          messages.push(message);
        }

        if (messages.length === 0) {
          this._messages = [];
        } else {
          this._messages = messages;
        }

        if (messages.length <= 5) {
          this.setState({
            messages: messages,
            allLoaded: true
          });
        } else {
          this.setState({messages: messages});
        }

        this.unreadCount = result.unread;



        this.props.dispatch(readChatThreadActionCreator(this.state.chatId, this.props.profileId)).then(
          (response) => {
            this.props.dispatch(setMessageStatusRead(this.state.chatId, this.unreadCount));
          }
        )
      }
    )
  }

  setMessageStatus(uniqueId, status) {
    let messages = [];
    let found = false;

    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        let clone = Object.assign({}, this._messages[i]);
        clone.status = status;
        messages.push(clone);
        found = true;
      } else {
        messages.push(this._messages[i]);
      }
    }

    if (found === true) {
      this.setMessages(messages);
    }
  }

  setMessages(messages) {
    this._messages = messages;

    // append the message
    this.setState({
      messages: messages,
    });
  }

  handleSend(message = {}) {

    // Your logic here
    // Send message.text to your server
    this.setState({height: 33})
    let profileId = this.props.profileId;
    let toFriend = this.props.profile.profile_id;
    let payload = {
      profile: {
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname,
        fbid: this.props.user.fbid,
        image: this.props.user.image,
        profileId: this.props.user.profileId
      },
      message: message
    }

    this.props.dispatch(createChatActionCreator(profileId, toFriend, message.text)).then(
      (response) => {
          console.log('RESPONSE CREATE CHAT: ', response);
          if (response.info === 'Entry added to chat') {
            this.props.dispatch(addChatEntryAction(response.chat_id, message.text));
            this.state.channel.trigger('client-message', payload);
          } else {
            this.setState({
              channel: this._pusher.subscribe(`private-${response.chat_id}`),
              chatId: response.chat_id
            });

            this.state.channel.bind('pusher:subscription_succeeded', () => {
              this.state.channel.trigger('client-message', payload);
            });

            this.state.channel.bind('client-message', (data) => {
              this.handleReceive(data);
            });
          }
      }
    );

    message.uniqueId = Math.round(Math.random() * 10000); // simulating server-side unique id generation

    this.setMessages(this._messages.concat(message));




    // mark the sent message as Seen
    // setTimeout(() => {
    //   this.setMessageStatus(message.uniqueId, 'Seen'); // here you can replace 'Seen' by any string you want
    // }, 1000);

    // if you couldn't send the message to your server :
    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {

    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    });

    if (this.state.messages.length > 0) {
      let id = this._messages[0].entry_id;

      console.log('ENTRY ID: ', id);
      getChatThread(this.state.chatId, this.props.profileId, id).then(
        (response) => {
          let messages = [];
          let allLoaded = false;

          for (item of response.entries) {
            let message = {
              text: item.body,
              entry_id: item.entry_id,
              name: `${item.profile.firstname} ${item.profile.lastname}`,
              image: {uri: item.profile.image},
              uniqueId: Math.round(Math.random() * 10000),
              profile: item.profile
            };

            if (item.profile.profile_id === this.props.profileId) {
              message.position = 'right'
            } else {
              message.position = 'left'
            }
            messages.push(message);
          }

          if (response.length < 15) {
            allLoaded = true;
          }

          this.setMessages(messages.concat(this._messages));
          this.setState({
            isLoadingEarlierMessages: false,
            allLoaded: allLoaded
          })
        }
      )
    }

  }

  handleReceive(body = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    console.log('MESSAGE RECIEVED: ', body);
    let message = {
      text: body.message.text,
      uniqueId: Math.round(Math.random() * 10000),
      position: 'left',
      image: {uri: body.profile.image},
      name: `${body.profile.firstname} ${body.profile.lastname}`,
      date: body.message.date,
      profile: body.profile
    };

    this.setMessages(this._messages.concat(message));
  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '');
  }

  onImagePress(message = {}) {
    if (message.profile.profile_id !== this.props.user.profileId) {
        this.props.navigator.push({name: 'userProfile', data: message.profile});
    } else {
      this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
    }
  }

  backPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={{
            title: this.props.profile.firstname,
            handler: () => this.props.navigator.push({name: 'userProfile', data: this.props.profile})
          }}
          leftButton={<BackArrow onPress={() => this.backPress()}/>}
          />
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}

          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#FF0055',
            },
            loadEarlierMessagesButton: {
              color: '#FF0055',
              fontSize: 14,
            },
            textInputContainer: {
              height: this.state.height,
              borderTopWidth: 1 / PixelRatio.get(),
              justifyContent: 'center',
              alignItems: 'flex-end',
              borderColor: '#b2b2b2',
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
            }
          }}

          autoFocus={false}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          onErrorButtonPress={this.onErrorButtonPress.bind(this)}
          maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

          loadEarlierMessagesButton={!this.state.allLoaded}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

          senderName={`${this.props.profile.firstname} ${this.props.profile.lastname}`}
          senderImage={{uri: this.props.user.image}}
          onImagePress={(message) => this.onImagePress(message)}
          displayNames={true}
          onChange={(event) => {
            let height = event.nativeEvent.contentSize.height;
            this.setState({
              height: height
            })
          }}
          parseText={false} // enable handlePhonePress, handleUrlPress and handleEmailPress
          handlePhonePress={this.handlePhonePress}
          handleUrlPress={this.handleUrlPress}
          handleEmailPress={this.handleEmailPress}

          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

          typingMessage={this.state.typingMessage}
        />
    </View>
    );
  }

  handleUrlPress(url) {
    Linking.openURL(url);
  }

  // TODO
  // make this compatible with Android
  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            //Communications.phonecall(phone, true);
            break;
          case 1:
            //Communications.text(phone);
            break;
        }
      });
    }
  }

  handleEmailPress(email) {
    //Communications.email(email, null, null, null, null);
  }

}

function select(store) {
  return {
    profileId: store.user.profileId,
    user: store.user
  }
}


module.exports = connect(select)(GiftedMessengerContainer);
