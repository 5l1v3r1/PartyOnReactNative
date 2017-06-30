import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView,
  RefreshControl,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import LinearGradient from 'react-native-linear-gradient';
const SCREEN_WIDTH = require('Dimensions').get('window').width;
import { connect } from 'react-redux'
import strings from '../../strings/strings';
import TimerMixin from 'react-timer-mixin';
import {
  loadMyPartiesActionCreator,
  inviteToPartyActionCreator
} from '../../actions'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class InviteUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }

  componentDidMount() {
    // TimerMixin.setTimeout(
    //   () => {
    //     if (this.props.myParties.length == 0) {
    //       // logic
    //     }
    //   }, 500
    // );
    this.setState({refreshing: true});
    this.props.dispatch(loadMyPartiesActionCreator(this.props.profileId, this.props.profileId, this.props.location)).then(
      (response) => {
        this.setState({refreshing: false})
      }
    )
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(loadMyPartiesActionCreator(this.props.profileId, this.props.profileId, this.props.location)).then(
      (response) => {
        this.setState({refreshing: false});
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: `Invite ${this.props.profile.firstname} to a party`}}
          leftButton={{
            title: 'Lukk',
            tintColor: '#ff0055',
            handler: () => this.props.navigator.pop()
          }}
          />
        <ListView
          style={styles.container}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              />
          }
          dataSource={ds.cloneWithRows(this.props.myParties)}
          renderRow={(rowData, sectionId, rowID) =>
            <PartyRow
              rowData={rowData}
              name={`${this.props.profile.firstname} ${this.props.profile.lastname}`}
              onInvitePress={() => this.onInvitePress(rowData)}
              />
            }
          />
      </View>
    );
  }

  onInvitePress(party) {
    this.props.dispatch(inviteToPartyActionCreator(party.party_id, this.props.profileId, this.props.profile.profile_id)).then(
      (response) => {

      }
    )
  }

  onSelect(party) {
    Alert.alert(
    'Invite',
    `Do you want to invite ${this.props.profile.firstname} ${this.props.profile.lastname} to ${party.title}?`,
    [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Invite', onPress: () => this.onInvitePress(party)},
    ]
  )
  }

}

class PartyRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invited: false
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.rowWrapper} onPress={() => this.onSelect()}>
        <Image style={styles.image} source={{uri: this.props.rowData.image}}>
          <View style={[styles.image, {justifyContent: 'flex-end'}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {this.renderInvitedText()}
            </View>
            <LinearGradient style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              colors={['transparent', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.25)']}>
              <Text style={styles.titleText}>{this.props.rowData.title}</Text>
            </LinearGradient>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  renderInvitedText() {
    if (this.state.invited) {
      return (
        <Text style={styles.titleText}>Invitasjon sendt</Text>
      );
    }
  }

  onSelect() {
    Alert.alert(
      'Invite',
      `Do you want to invite ${this.props.name} to ${this.props.rowData.title}?`,
      [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Invite', onPress: () => this.onInvitePress()},
      ]
    )
  }

  onInvitePress() {
    this.setState({invited: true});
    this.props.onInvitePress();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white'
  },
  rowWrapper: {
    height: 150,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  image: {
    flex: 1,
    height: 150,
    width: SCREEN_WIDTH
  },
  titleText: {
    fontSize: 24,
    color: 'white',

  }
});

function select(store) {
  return {
    myParties: store.user.parties,
    profileId: store.user.profileId,
    location: store.location
  }
}

module.exports = connect(select)(InviteUser);
