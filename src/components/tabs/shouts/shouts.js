import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ListView,
  Image,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';

const ShoutRow = require('./shout-row');
const NavigationBar = require('react-native-navbar');
const {
  loadShoutoutsActionCreator,
  likeShoutoutActionCreator,
  dislikeShoutoutActionCreator,
  deleteShoutoutActionCreator,
  requestCameraPermission,
  getCurrentPosition
 } = require('../../../actions');
const {height, width} = Dimensions.get('window');
const strings = require('../../../strings/strings');
const { connect } = require('react-redux');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ErrorView = require('../../commons/error-view');
let Shouts = React.createClass({

  getInitialState() {
    return {
      refreshing: false,
      noConnection: false
    };
  },

  componentDidMount() {
    this.setState({refreshing: true});
    this.props.dispatch(getCurrentPosition())
      .then(() => this.props.dispatch(loadShoutoutsActionCreator(this.props.location, this.props.profileId)))
      .then((result) => {
        if (result.empty) {
          this.setState({
            refreshing: false,
            noConnection: false
          });
        } else {
          this.setState({
            refreshing: false,
            noConnection: false
          });
        }
      })
      .catch(() => {
        this.setState({
          refreshing: false,
          noConnection: true
        });
      });
  },

  renderHeader() {
    if (this.props.isEmpty) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{strings.noShoutoutsNearby}</Text>
        </View>
      );
    }
  },

  renderList() {
      return (
        <View style={{flex: 1}}>
          {this.renderErrorView()}
            <ListView
              style={styles.listView}
              automaticallyAdjustContentInsets={false}
              enableEmptySections={true}
              renderHeader={() => this.renderHeader()}
              refreshControl={
                <RefreshControl
                  tintColor={'#FF0055'}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                  />
              }
              dataSource={ds.cloneWithRows(this.props.shoutouts)}
              renderSeparator={(sectionID, rowID) =>
                <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
              renderRow={(rowData, sectionID, rowID) =>
                <ShoutRow
                  onImageHide={() => this.props.onImageHide()}
                  onLikePress={() => this.onLikePress(rowID)}
                  onUserPress={() => this.onUserPress(rowID)}
                  onImagePress={() => this.props.onImagePress(this.props.shoutouts[rowID])}
                  onDeleteShoutout={() => this.onDeleteShoutout(rowID)}
                  onReportShoutout={() => this.onReportShoutout(rowID)}
                  shoutout={rowData}
                  profileId={this.props.profileId}
                  ></ShoutRow>}>
            </ListView>
          </View>
      );
  },

  onLikePress(rowID) {
    let { id, liked } = this.props.shoutouts[rowID];

    let profileId = this.props.profileId;
    if (liked) {
      this.props.dispatch(dislikeShoutoutActionCreator(id, profileId, rowID)).then(
        (response) => {
          console.log('RESPONSE: ', response);
        }
      )
    } else {
      this.props.dispatch(likeShoutoutActionCreator(id, profileId, rowID)).then(
        (response) => {
          console.log('RESPONSE: ', response);
        }
      )
    }
  },

  onDeleteShoutout(rowID) {
    let { id } = this.props.shoutouts[rowID];
    let profileId = this.props.profileId;
    this.props.dispatch(deleteShoutoutActionCreator(profileId, id, rowID)).then(
      (response) => {
        console.log('RESPONSE: ', response);
      }
    )
  },

  onReportShoutout(rowID) {

  },

  onUserPress(rowID) {
    let profileId = this.props.shoutouts[rowID].profile_id;
    if (profileId === this.props.profileId) {
      this.props.navigator.push({name: 'myProfile', data: {segment: 'fester'}});
    } else {
      this.props.navigator.push({name: 'userProfile', data: this.props.shoutouts[rowID].profile});
    }
  },

  onRefresh() {
      this.setState({refreshing: true});
      this.props.dispatch(getCurrentPosition())
        .then(() => this.props.dispatch(loadShoutoutsActionCreator(this.props.location, this.props.profileId)))
        .then((result) => {
          if (result.isEmpty) {
            this.setState({
              refreshing: false,
              noConnection: false
            });
          } else {
            this.setState({
              refreshing: false,
              noConnection: false
            });
          }
        })
        .catch((error) => {
          this.setState({
            refreshing: false,
            noConnection: true
          })
        });
  },

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar
          title={(
            <View>
              <Text style={styles.navbarName}>Shoutouts</Text>
              <Text style={styles.navbarCity}>{this.props.location.city}</Text>
            </View>
          )}
          style={styles.navBar}
          leftButton={this.renderLeftButtonAndroid()}
          />
        {this.renderList()}
      </View>
    );
  },

  renderLeftButtonAndroid() {
    if (Platform.OS === 'android') {
      return {
        title: strings.createShoutout,
        tintColor: '#ff0055',
        handler: () => this.onNewShoutoutPress()
      }
    }
  },

  onNewShoutoutPress() {
    requestCameraPermission().then(
      () => {
        this.props.navigator.push({name: 'shoutout'})
      }
    )
  },

  renderErrorView() {
    if (this.state.noConnection) {
      return <ErrorView/>
    }
  }
});

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 50
      }
    })
  },
  navBar: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  navbarName: {
    textAlign: 'center',
    fontSize: 15,
    color: '#424242',
    fontWeight: 'bold'
  },
  navbarCity: {
    textAlign: 'center',
    fontSize: 11,
    color: '#424242'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  emptyView: {
    //flex: 1,
    height: height / 1.8,
    width: width,
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#ff0055',
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.95
  },

});

function select(store) {
  return {
    location: store.location,
    shoutouts: store.shoutouts.shoutouts,
    profileId: store.user.profileId,
    isEmpty: store.shoutouts.isEmpty
  }
}

module.exports = connect(select)(Shouts);
