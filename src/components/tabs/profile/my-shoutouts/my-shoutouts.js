import React from 'react';
import {
  ListView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from 'react-native';

const {
  loadMyShoutoutsActionCreator,
  deleteShoutoutActionCreator
} = require('../../../../actions');

import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
const BackArrow = require('../../../commons/backButtonNavItem');
const strings = require('../../../../strings/strings');
const ShoutRow = require('../../shouts/shout-row');
const {height, width} = Dimensions.get('window');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var MyShoutouts = React.createClass({

  getInitialState() {
    return {
      refreshing: false,
      imageIsShowing: false,
      image: '',
      caption: ''
    }
  },

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar
          title={{title: strings.myShoutouts}}
          leftButton={<BackArrow onPress={() => {this.onBackPress()}}/>}
          />
          {this.renderList()}
          {this.renderFullImage()}
      </View>
    );
  },

  componentDidMount() {
    if (!this.props.shoutouts.length > 0) {
      this.setState({refreshing: true});
      this.props.dispatch(loadMyShoutoutsActionCreator(this.props.profileId)).then(
        (result) => {
          this.setState({refreshing: false});
        }
      )
    }
  },

  onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(loadMyShoutoutsActionCreator(this.props.profileId)).then(
      (result) => {
        this.setState({refreshing: false});
      }
    )
  },

  renderList() {
    return (
      <View style={{flex: 1}}>
          <ListView
            style={styles.container}
            automaticallyAdjustContentInsets={false}
            enableEmptySections={true}
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
                onDeleteShoutout={() => this.onDeleteShoutout(rowID)}
                onImagePress={() => this.onImagePress(this.props.shoutouts[rowID])}
                shoutout={rowData}
                profileId={this.props.profileId}
                ></ShoutRow>}>
          </ListView>
        </View>
    );
  },

  onDeleteShoutout(rowID) {
    let { id } = this.props.shoutouts[rowID];
    let profileId = this.props.profileId;
    this.props.dispatch(deleteShoutoutActionCreator(profileId, id, rowID, true)).then(
      (response) => {
        console.log('RESPONSE: ', response);
      }
    )
  },

  onImagePress(shoutout) {
    this.setState({
      imageIsShowing: true,
      image: shoutout.image,
      caption: shoutout.text
    });
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
        <Text style={styles.imageCaption}>{this.state.caption}</Text>
      );
    }
  },

  onBackPress() {
    this.props.navigator.pop();
  },


});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  navbarName: {
    textAlign: 'center',
    fontSize: 15,
    color: '#424242',
    fontWeight: 'bold'
  },
  fullImage: {
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    width: width
  },
  imageCaption: {
    fontSize: 18,
    padding: 5,
    color: 'white',
    backgroundColor: '#FF0055'
  },
});

function select(store) {
  return {
    shoutouts: store.user.shoutouts,
    profileId: store.user.profileId
  }
}


module.exports = connect(select)(MyShoutouts);
