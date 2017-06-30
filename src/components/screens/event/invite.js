import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const FBSDK = require('react-native-fbsdk');
const ProfilePic = require('../../commons/profilepic');
const BackButton = require('../../commons/backButtonNavItem');
const {
  appendGuest,
  removeGuest,
  inviteToPartyActionCreator,
  getFriendsListActionCreator,
  toggleBarStyle,
 } = require('../../../actions');

const { connect } = require('react-redux');
const FullWidthBtn = require('../../commons/full-width-button');
const strings = require('../../../strings/strings')
import Tick from '../../../resources/upload-tick.png'

const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

let Invite = React.createClass({
  getInitialState() {
    return {
      dataSource: null,
      isLoading: false,
      invites: [],
      friends: [],
    };
  },

  componentWillMount() {
    this.props.dispatch(toggleBarStyle());
    const infoRequest = new GraphRequest(
      '/me/friends',
      null,
      this.responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
  },

  responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      console.log('error fetching data');
    } else {
      console.log('FRIENDS: ', result);

      this.getFriendsFromApi(result);
    }
  },

  getFriendsFromApi(result) {
    let fbids = [];
    for (item of result.data) {
      fbids.push(item.id);
    }
    this.props.dispatch(getFriendsListActionCreator(fbids.toString()))
      .then((result) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(result),
          friends: result
        });
      });
  },

  renderListView() {
    if (!this.state.dataSource) {
      return (
          <ActivityIndicator
            style={{flex: 1}}
            size='large'
            color='#FF0055'/>
      );
    } else {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowID) =>
            <InviteRow
            party={this.props.data.party}
            fromParty={this.props.data.fromParty}
            onPress={(selected, profileId) => this.onSelect(selected, profileId, rowID)}
            friend={this.state.friends[rowID]}
            invites={this.props.invites}
            rowData={rowData}/>}
          />
      );
    }
  },

  render() {
    return(
      <View style={styles.container}>
        <NavigationBar
          title={{title: strings.inviteFriends}}
          leftButton={
            <View style={styles.buttonWrapper}>
              <BackButton onPress={() => this.onBackPress()}/>
            </View>
          }
          />
        {this.renderListView()}
        {this.renderFullWidthButton()}
      </View>
    );
  },

  renderFullWidthButton() {
    if (this.props.data.fromParty) {
      return <FullWidthBtn text={strings.save} onPress={() => this.onSavePress()}/>
    } else {
      return <FullWidthBtn text={strings.continue} onPress={() => this.onBackPress()}/>
    }
  },

  onSelect(selected, profile_id, rowID) {
    if (!this.props.data.fromParty) {
      const { dispatch } = this.props;
      selected ? dispatch(removeGuest(rowID)) : dispatch(appendGuest(profile_id));
    } else {
      if (!selected) {
        this.state.invites.push(profile_id);
        this.setState({invites: this.state.invites});
        console.log('state invites: ', this.state.invites);
      } else {
        for (var i = 0; i < this.state.invites.length; i++) {
          if (this.state.invites[i] === profile_id) {
            this.state.invites.splice(i, 1);
            this.setState({invites: this.state.invites});
          }
        }
        console.log('state invites: ', this.state.invites);
      }
    }
  },

  onBackPress() {
    this.props.navigator.pop();
  },

  onSavePress() {
    this.props.dispatch(inviteToPartyActionCreator(this.props.data.party.party_id, this.props.profileId, this.state.invites.join(','))).then(
      (result) => {
        this.props.navigator.pop();
      }
    )
  }
});



let InviteRow = React.createClass({
  getInitialState() {
    return {
      selected: this.checkSelected(),
      invited: this.checkInvited()
    };
  },

  checkSelected() {
    console.log('PROFILE_ID: ', this.props.rowData.profile_id);
    if (!this.props.fromParty) {
      let guestSet = new Set(this.props.invites);
      if (guestSet.has(this.props.rowData.profile_id)) {
        return true;
      } else {
        return false;
      }
    } else {
      let guestSet = new Set(this.props.party.guestlist);
      if (guestSet.has(this.props.rowData.fbid)) {
        return true;
      } else {
        return false;
      }
    }
  },

  checkInvited() {
    if (!this.props.fromParty) {
      let guestSet = new Set(this.props.invites);
      if (guestSet.has(this.props.rowData.profile_id)) {
        return true;
      } else {
        return false;
      }
    } else {
      let inviteSet = new Set(this.props.party.invitelist);
      if (inviteSet.has(this.props.rowData.profile_id)) {
        return true;
      } else {
        return false;
      }
    }
  },

  render() {
    return(
      <TouchableOpacity
        onPress={() => this.select()}
        disabled={this.state.invited ? true : false}
        style={[styles.inviteRow]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <ProfilePic
              style={styles.image}
              url={this.props.rowData.image}
              />
            <Text style={[styles.name]}>
              {this.props.rowData.firstname + ' ' + this.props.rowData.lastname}
            </Text>
          </View>
          {this.renderInvitedStatus()}
        </View>
      </TouchableOpacity>
    );
  },

  renderInvitedStatus() {
    if (this.state.invited) {
      return (
        <View style={{flex: 0.2, padding: 10}}>
          <View style={[styles.inviteStatus, {backgroundColor: '#2ecc71'}]}>
            <Text style={styles.inviteStatusText}>INVITED</Text>
          </View>
        </View>
      );
    } else if (this.state.selected) {
      return (
        <View style={{flex: 0.2, padding: 10}}>
          <View style={[styles.inviteStatus, {backgroundColor: 'white'}]}>
            <Image style={{height: 25, width: 25, resizeMode: 'contain'}} source={Tick}/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flex: 0.2, padding: 10 }}>
          <View style={[styles.inviteStatus, {backgroundColor: '#ff0055'}]}>
            <Text style={styles.inviteStatusText}>INVITE</Text>
          </View>
        </View>
      );
    }
  },

  select() {
    if (this.state.selected) {
      this.setState({
        selected: false
      });
    } else {
      this.setState({
        selected: true
      });
    }

    this.props.onPress(this.state.selected, this.props.rowData.profile_id);
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  inviteRow: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterView: {
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'gray'
  },
  buttonWrapper: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterLeftWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    flex: 6,
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  inviteStatus: {
    flex: 1,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inviteStatusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold'
  }
});

function select(store) {
  return {
    invites: store.event.invites,
    profileId: store.user.profileId
  }
}

module.exports = connect(select)(Invite);
