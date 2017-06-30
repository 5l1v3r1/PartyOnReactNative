import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  BackAndroid,
  Navigator,
  View
} from 'react-native';
import ProgressBar from 'react-native-progress-bar';
const codePush = require('react-native-code-push');

const Login = require('./components/screens/login');
const Root = require('./components/screens/root');
const Filter = require('./components/screens/filter/filter');
const Event = require('./components/screens/event/event');
const Picture = require('./components/screens/event/picture');
const Invite = require('./components/screens/event/invite');
const Profile = require('./components/tabs/profile/my-profile');
const Notifications = require('./components/tabs/profile/my-notifications');
const MyParty = require('./components/tabs/profile/my-party');
const Attendings = require('./components/tabs/profile/my-attendings');
const MyShoutouts = require('./components/tabs/profile/my-shoutouts/my-shoutouts');
const Achievements = require('./components/tabs/profile/my-achievements');
const NewMessage = require('./components/screens/new-message/new-message');
const Chat = require('./components/screens/chat');
const Party = require('./components/screens/party/party');
const GenericParty = require('./components/commons/generic-party');
const PartyMap = require('./components/screens/party/party-map');
const Guests = require('./components/screens/party/party-guests');
const LandingPage = require('./components/screens/landing-page');
const UserProfile = require('./components/screens/user-profile');
const Shoutout = require('./components/screens/shoutout');
const Settings = require('./components/screens/settings');
const EditProfile = require('./components/tabs/profile/edit-profile');
const InviteUser = require('./components/screens/invite-user');
const Legal = require('./components/screens/legal');

var { connect } = require('react-redux');

const ROUTES = {
  login: Login,
  landingPage: LandingPage,
  root: Root,
  filter: Filter,
  notifications: Notifications,
  chat: Chat,
  newMessage: NewMessage,
  event: Event,
  picture: Picture,
  invite: Invite,
  userProfile: UserProfile,
  myProfile: Profile,
  myParty: MyParty,
  myAttendings: Attendings,
  myShoutouts: MyShoutouts,
  myAchievements: Achievements,
  party: Party,
  genericParty: GenericParty,
  partyMap: PartyMap,
  guests: Guests,
  shoutout: Shoutout,
  settings: Settings,
  editProfile: EditProfile,
  inviteUser: InviteUser,
  legal: Legal
}

const SCREEN_WIDTH = require('Dimensions').get('window').width;

const FloatFromRight = {
  ...Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: SCREEN_WIDTH
    }
  }
}

class PartyOnNavigator extends Component{

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      shouldShowProgress: false,
    }

  }
  // var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.
  // handleNotification(notification, dispatch) { // If you want to handle the notifiaction with a payload.
  //
  //
  //
  // },

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];

    BackAndroid.addEventListener('hardwareBackPress', () => {
      console.log('ROUTES: ', navigator.getCurrentRoutes());
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      } else {
        return false;
      }
    });


    return <Component
      route={route}
      navigator={navigator}
      data={route.data}
      profile={route.profile}
      chatId={route.chatId}
      position={route.position}
      />;
  }

  componentDidMount() {
    codePush.sync({ updateDialog: false },
      (status) => {
          switch (status) {
              case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                  this.setState({shouldShowProgress: true});
                  break;
              case codePush.SyncStatus.INSTALLING_UPDATE:
                  this.setState({shouldShowProgress: false});
                  break;
          }
      },
      ({ receivedBytes, totalBytes, }) => {
        this.setState({progress: receivedBytes / totalBytes});
      }
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator
          initialRoute={{name: this.props.initialRoute}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            let name = route.name;
            // TODO Refactor for performance?!?!?!?
            if (name === 'event' || name === 'filter' || name === 'newMessage' || name === 'guests' || name ==='partyMap' || name === 'shoutout' || name === 'editProfile' || name === 'inviteUser') {
              return Navigator.SceneConfigs.FloatFromBottom;
            } else {
              return FloatFromRight;
            }
          }}
          />
          {this.renderProgressBar()}
      </View>
    );
  }

  renderProgressBar() {
    if (this.state.shouldShowProgress) {
      return (
        <ProgressBar
          fillStyle={styles.progressBg}
          backgroundStyle={styles.progress}
          style={{width: SCREEN_WIDTH, position: 'absolute', top: 0}}
          progress={this.state.progress}
        />
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progress: {
    backgroundColor: '#cccccc',
    height: 20,
  },
  progressBg: {
    height: 20,
    backgroundColor: '#ff0055'
  }
});

function select(store) {
  return {
    initialRoute: store.navigation.initialRoute,
  };
}

module.exports = connect(select)(PartyOnNavigator);
