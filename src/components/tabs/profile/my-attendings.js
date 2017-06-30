import React from 'react';
import {
  ListView,
  View,
  Text,
  RefreshControl,
  Dimensions,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
const {height, width} = Dimensions.get('window');
const TimerMixin = require('react-timer-mixin');
const PartyRow = require('../home/partyrow');
import NavigationBar from 'react-native-navbar';
const BackArrow = require('../../commons/backButtonNavItem');
const {
  loadMyAttendingsActionCreator
} = require('../../../actions');
const strings = require('../../../strings/strings');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var MyAttendings = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      refreshing: false,
      noConnection: false
    }
  },

  componentDidMount() {
    if (!this.props.attendings.length > 0) {
      this.setTimeout(() => {
        this.fetchMyAttendings();
      }, 300);
    }
  },

  onRefresh() {
    this.fetchMyAttendings();
  },

  fetchMyAttendings() {
    this.setState({refreshing: true});
    this.props.dispatch(loadMyAttendingsActionCreator(this.props.profileId, this.props.location))
      .then(() => {
        this.setState({
          refreshing: false,
          noConnection: false,
        })
      })
      .catch(() => {
        this.setState({
          refreshing: false,
          noConnection: true
        })
      })
  },

  render() {
    return(
      <View style={styles.container}>
      <NavigationBar
        title={{title: strings.myAttendings}}
        leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
        />
      {this.renderListView()}
      </View>
    );
  },

  renderListView() {
    return (
      <View style={{flex: 1}}>
        {this.renderErrorView()}
        <ListView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              />
          }
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          renderHeader={() => this.renderHeader()}
          dataSource={ds.cloneWithRows(this.props.attendings)}
          renderRow={(party, sectionId, rowID) =>
            <PartyRow
              onPress={() => this.onRowPress(rowID)}
              onJoinPress={() => this.onRowPress(rowID)}
              onUserPress={() => this.onUserPress(party)}
              profileId={this.props.profileId}
              party={party}
              />
          }>
        </ListView>
      </View>
    );
  },

  onUserPress(party) {
    this.props.navigator.push({name: 'userProfile', data: party.creator});
  },


  renderHeader() {
    if (this.props.noAttendings) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{strings.noAttendings}</Text>
        </View>
      );
    }
  },

  renderErrorView() {

  },

  onRowPress(rowID) {
    this.props.navigator.push({name: 'genericParty', data: {partyId: this.props.attendings[rowID].party_id}});
  },

  onBackPress() {

  },


});


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    //flex: 1,
    height: height - 100,
    width: width,
    padding: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#ff0055',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.95
  },
});

function select(store) {
  return {
    attendings: store.user.attendings,
    noAttendings: store.user.noAttendings,
    profileId: store.user.profileId,
    location: store.location
  }
}

module.exports = connect(select)(MyAttendings);
