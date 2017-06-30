import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  ListView,
  RefreshControl,
  Image,
  Dimensions
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const RightNavItem = require('../../commons/rightNavbarItem');
const MessageRow = require('./message-row');
const strings = require('../../../strings/strings');
const {height, width} = Dimensions.get('window');
const {
  fetchChatsActionCreator
} = require('../../../actions');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import { connect } from 'react-redux';

let Messages = React.createClass({

  getInitialState() {
    return {
      refreshing: false,
      filter: ''
    };
  },

  componentDidMount() {
    this.setState({refreshing: true});
    this.props.dispatch(fetchChatsActionCreator(this.props.profileId)).then(
      (result) => {
        this.setState({refreshing: false});
      }
    )
  },

  onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(fetchChatsActionCreator(this.props.profileId)).then(
      (result) => {
        this.setState({refreshing: false});
      }
    )
  },

  getDataSource() {
    if (!this.state.filter) {
       return ds.cloneWithRows(this.props.chats);
     }
     let filtered = this.props.chats.filter(entry => entry.profile.fullName.toLowerCase().indexOf(this.state.filter.toLowerCase())
           >= 0);

     return ds.cloneWithRows(filtered);
  },

  render() {
    const rightButtonConfig = {
      title: strings.newMessage,
      tintColor: '#FF0859',
      handler: () => this.props.navigator.push({name: 'newMessage'}),
    };

    const titleConfig = {
      title: strings.messages,
      tintColor: '#424242'
    };
    const statusBarConfig = {
      style: 'default',
      tintColor: 'white',
    };

    return(
      <View style={styles.container}>
        <NavigationBar title={titleConfig}
          rightButton={rightButtonConfig}
          statusBar={statusBarConfig}
          />
        <View style={styles.searchWrapper}>
          <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={this.state.filter}
              onChangeText={(text) => {
                this.setState({
                  filter: text
                });
              }}/>
        </View>
        {this.renderListView()}
      </View>
    );
  },

  renderHeader() {
    if (this.props.isEmpty) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{strings.noChats}</Text>
        </View>
      );
    }
  },

  renderListView() {
    return(
      <ListView
        style={styles.listView}
        dataSource={this.getDataSource()}
        enableEmptySections={true}
        renderHeader={() => this.renderHeader()}
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            tintColor={'#FF0055'}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            />
        }
        renderRow={(rowData, sectionId, rowID) =>
          <MessageRow onPress={() => this.onMessageRowPress(rowData)} rowData={rowData}/>}>
      </ListView>
    );
  },

  onMessageRowPress(chat) {
    this.props.navigator.push({
      name: 'chat',
      chatId: chat.chat_id,
      profile: chat.profile
    });
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchWrapper: {
    padding: 5,
  },
  searchInput: {
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: 35,
  },
  listView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 50
      }
    })
  },
  emptyView: {
    //flex: 1,
    height: height - 100,
    width: width,
    padding: 75,
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
    chats: store.chats.chats,
    isEmpty: store.chats.isEmpty,
    profileId: store.user.profileId
  }
}

module.exports = connect(select)(Messages);
