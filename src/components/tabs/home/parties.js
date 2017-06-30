import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  RefreshControl,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';

const PartyRow = require('./partyrow');
const ErrorView = require('../../commons/error-view');
const { connect } = require('react-redux');
const strings = require('../../../strings/strings');
const {height, width} = Dimensions.get('window');
const {
  loadPartiesActionCreator,
  getCurrentPosition,
  toggleBarStyle,
  joinPartyActionCreator,
  requestLocationPermissions,
  setFilterActionCreator
} = require('../../../actions');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var Parties = React.createClass({
  getInitialState() {
    return {
      refreshing: false,
      noConnection: false
    };
  },

  fetchParties() {
    this.setState({refreshing: true});
    this.props.dispatch(getCurrentPosition())
      .then(() => this.props.dispatch(setFilterActionCreator(this.props.profileId, this.props.location, this.props.filter, true)))
      .then(() => {
        this.setState({
          refreshing: false,
          noConnection: false,
        })
      })
      .catch((error) => {
        this.setState({
          noConnection: true,
          refreshing: false
        });
      });
  },

  componentDidMount() {
    if (!this.props.parties.length > 0) {
      if (Platform.OS === 'android') {
        requestLocationPermissions().then(
          () => {
            this.fetchParties();
          }
        )
      } else {
        this.fetchParties();
      }
    }
  },

  onRefresh() {
    this.fetchParties();
  },

  render() {
    return(
      <View style={{flex: 1}}>
        {this.renderErrorView()}
        <ListView
          style={styles.listView}
          renderHeader={() => this.renderHeader()}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              />
          }
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(this.props.parties)}
          renderRow={(party, sectionId, rowID) =>
            <PartyRow
              onPress={() => this.onRowPress(rowID)}
              onJoinPress={() => this.onJoinPress(rowID)}
              onUserPress={() => this.onUserPress(rowID)}
              profileId={this.props.profileId}
              party={party}
              />
          }>
        </ListView>
      </View>
    );
  },

  renderHeader() {
    if (this.props.isEmpty === 'PARTIES') {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{strings.noPartiesNearby}</Text>
        </View>
      );
    }

    if (this.props.isEmpty === 'FILTER') {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{strings.noFilterMatch}</Text>
        </View>
      );
    }
  },

  onRowPress(rowID) {
    this.props.dispatch(toggleBarStyle());
    this.props.navigator.push({name: 'party', position: rowID});
  },

  onJoinPress(rowID) {
    this.props.dispatch(toggleBarStyle());
    this.props.navigator.push({name: 'party', position: rowID});
  },

  onUserPress(rowID) {
    let profileId = this.props.parties[rowID].profile_id;
    if (profileId === this.props.profileId) {
      this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
    } else {
      this.props.navigator.push({name: 'userProfile', data: this.props.parties[rowID].creator});
    }
  },

  renderErrorView() {
    if (this.state.noConnection) {
      return (
        <ErrorView/>
      );
    }
  }
});

const styles = StyleSheet.create({
  listView: {
    ...Platform.select({
      ios: {
        marginBottom: 50
      }
    })
  },
  emptyView: {
    height: height - 100,
    width: width,
    padding: 65,
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
    parties: store.party.parties,
    profileId: store.user.profileId,
    location: store.location,
    isEmpty: store.party.isEmpty,
    filter: store.filter
  }
}

module.exports = connect(select)(Parties);
