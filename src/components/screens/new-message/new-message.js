import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const FBSDK = require('react-native-fbsdk');
const NewMesssageRow = require('./new-message-row');
const {getFriendsList} = require('../../../api/PartyOnAPI');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState() {
    return {
      filter: '',
      dataSource: ds.cloneWithRows([]),
      friends: []
    };
  },

  getDataSource() {
    if (!this.state.filter) {
      return this.state.dataSource;
    }

    let filtered = this.state.friends.filter(entry => entry.fullName.indexOf(this.state.filter)
          >= 0);

    return ds.cloneWithRows(filtered);
  },

  componentWillMount() {
    const infoRequest = new GraphRequest(
      '/me/friends',
      null,
      this.responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  },

  responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      console.log('error fetching data');
    } else {
      console.log('RESULT FB-FETCH: ', result);
      fbids = [];
      for (item of result.data) {
        fbids.push(item.id)
      }

      this.fetchFriends(fbids.join(','));
    }
  },

  fetchFriends(fbids) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    getFriendsList(fbids).then(
      (result) => {
        for (var i = 0; i < result.length; i++) {
          result[i].fullName = `${result[i].firstname} ${result[i].lastname}`;
        }
        this.setState({
          dataSource: ds.cloneWithRows(result),
          friends: result
        })
      }
    )
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
          enableEmptySections={true}
          dataSource={this.getDataSource()}
          renderRow={(rowData, sectionId, rowID) => <NewMesssageRow onPress={() => this.onUserPress(rowData)} rowData={rowData}/>}
          />
      );
    }
  },

  onUserPress(profile) {
    this.props.navigator.push({name: 'chat', profile: profile});
  },

  render() {
    return(
      <View style={styles.container}>
        <NavigationBar
          title={{title: 'Ny melding'}}
          rightButton={{title: 'Lukk', tintColor: '#FF0055', handler: () => this.close()}}
          />
        <View style={styles.filterView}>
          <View style={styles.filterLeftWrapper}>
            <Text>Til:</Text>
          </View>
          <TextInput
            style={styles.textInput}
            value={this.state.filter}
            onChangeText={(text) => this.setState({filter: text})}
            />
        </View>
        {this.renderListView()}
      </View>
    );
  },

  close() {
    this.props.navigator.pop();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  filterView: {
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'gray'
  },
  filterLeftWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    flex: 6,
  }
});
