import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Dimensions,
  SegmentedControlIOS,
  Platform,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

const strings = require('../../../strings/strings');
const {height, width} = Dimensions.get('window');
const NavigationBar = require('react-native-navbar');
const ProfilePic = require('../../commons/profilepic');
const PartyRow = require('../../tabs/home/partyrow');
const Achievement = require('../../commons/achievement');
const BackArrow = require('../../commons/backButtonNavItem');
const ShoutRow = require('../shouts/shout-row');
const TimerMixin = require('react-timer-mixin');
const ErrorView = require('../../commons/error-view');
const { connect } = require('react-redux');
import GenericParty from '../../commons/generic-party';
import { SegmentedControls } from 'react-native-radio-buttons';
import EmptyRow from '../../commons/empty-row';
const {
  loadMyPartiesActionCreator,
  loadMyShoutoutsActionCreator,
  deleteShoutoutActionCreator,
  dislikeShoutoutActionCreator,
  likeShoutoutActionCreator,
 } = require('../../../actions');

const ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });

var MyProfile = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    let segment;
    if (this.props.data.segment === 'shoutouts') {
      segment = 'shoutouts';
    } else {
      segment = 'fester';
    }
    return {
      partiesRefreshing: false,
      shoutoutsRefreshing: false,
      noConnection: false,
      segment: segment,
      imageIsShowing: false,
      image: '',
      caption: '',
      androidIndex: this.checkDefaultSegment(segment),
      captionPosition: 40
    };
  },

  componentDidMount() {
    this.setTimeout(
      () => {
        if (!this.props.myParties.length > 0) {
          this.setState({partiesRefreshing: true});
          this.props.dispatch(loadMyPartiesActionCreator(this.props.profileId, this.props.profileId, this.props.location))
            .then(() => {
              this.setState({
                partiesRefreshing: false,
                noConnection: false
              });
            })
            .catch(() => {
              this.setState({
                partiesRefreshing: false,
                noConnection: true
              })
            });
        }

        if (!this.props.myShoutouts.length > 0) {
          this.setState({shoutoutsRefreshing: true});
          this.props.dispatch(loadMyShoutoutsActionCreator(this.props.profileId, this.props.profileId)).then(
            (result) => {
              this.setState({shoutoutsRefreshing: false});
            }
          )
        }
      },
      500
    );

  },

  renderListViewData(parties) {
    var data = {};
    var onGoingSection = strings.onGoingParties,
      pastSection = strings.pastParties,
      upcomingSection = strings.upcomingParties;

    var sectionIds = [onGoingSection, pastSection];
    data[onGoingSection] = [];
    data[pastSection] = [];

    for (party of parties) {
      if (party.date >= new Date().getTime()) {
        data[onGoingSection].push(party);
      } else {
        data[pastSection].push(party);
      }
    }

    if (data[onGoingSection].length === 0) {
      data[onGoingSection].push({empty: true, text: strings.noOngoingParties});
    }

    if (data[pastSection].length === 0) {
      data[pastSection].push({empty: true, text: strings.noPastParties});
    }

    return {data, sectionIds};
  },

  onPartiesRefresh() {
    this.setState({partiesRefreshing: true});
    this.props.dispatch(loadMyPartiesActionCreator(this.props.profileId, this.props.profileId, this.props.location))
      .then(() => {
        this.setState({
          partiesRefreshing: false,
          noConnection: false
        })
      })
      .catch(() => {
        this.setState({
          partiesRefreshing: false,
          noConnection: true
        })
      });
  },

  onShoutoutsRefresh() {
    this.setState({shoutoutsRefreshing: true});
    this.props.dispatch(loadMyShoutoutsActionCreator(this.props.profileId, this.props.profileId)).then(
      (result) => {
        this.setState({shoutoutsRefreshing: false});
      }
    )
  },

  renderProfilePic() {
    if (this.props.id !== null) {
      return(
        <ProfilePic url={this.props.image}/>
      );
    }
  },

  renderNavigationBar() {
    return (
      <NavigationBar
        title={(
          <View>
            <Text style={styles.navbarName}>{this.props.name}</Text>
            <Text style={styles.navbarCity}>{this.props.city}</Text>
          </View>
        )}
        leftButton={<BackArrow onPress={() => {this.onBackPress()}}/>}
        // rightButton={{
        //   title: 'Settings',
        //   tintColor: '#ff0055',
        //   handler: () => this.props.navigator.push({name: 'settings'})
        // }}
        />
    )
  },

  renderSectionHeader(data, sectionId) {
    const icon = require('../../../resources/title-icon@2x.png');
    if (sectionId === 'Pågående fester') {
      return (
        <View style={styles.sectionHeader}>
          <Image style={styles.icon} source={icon}></Image>
          <Text style={styles.sectionHeaderText}>{sectionId}</Text>
          <View style={styles.circle}></View>
        </View>
      );
    }

    return (
      <View style={styles.sectionHeader}>
        <Image style={styles.icon} source={icon}></Image>
        <Text style={styles.sectionHeaderText}>{sectionId}</Text>
      </View>
    );
  },

  render() {
    return(
      <View style={styles.container}>
        {this.renderNavigationBar()}
        <View style={styles.separator}></View>
          {this.renderHeader()}
          {this.renderList()}
          {this.renderFullImage()}
      </View>
    );
  },

  renderList() {
    return (
      <View style={{flex: 1}}>
        {this.renderErrorView()}
        {this.checkSegment()}
      </View>
    );
  },

  checkSegment() {
    if (this.state.segment === 'fester') {
      return (
        <ListView
          style={styles.listView}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.partiesRefreshing}
              onRefresh={() => this.onPartiesRefresh()}
              />
          }
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          dataSource={
            ds.cloneWithRowsAndSections(this.renderListViewData(this.props.myParties).data, this.renderListViewData(this.props.myParties).sectionIds)
          }
          renderSectionHeader={(data, sectionId) => this.renderSectionHeader(data, sectionId)}
          renderRow={(party, sectionId, rowID) => {
            if (party.empty) {
              return <EmptyRow text={party.text}/>
            } else {
              return <PartyRow
                onPress={() => this.onRowPress(party)}
                profileId={this.props.profileId}
                party={party}/>
            }
          }
        }>
        </ListView>
      );
    } else {
      return (
        <ListView
          style={{flex: 1, backgroundColor: 'white'}}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          renderHeader={() => this.renderShoutoutHeader()}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.shoutoutsRefreshing}
              onRefresh={() => this.onShoutoutsRefresh()}
              />
          }
          dataSource={ds.cloneWithRows(this.props.myShoutouts)}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          renderRow={(rowData, sectionID, rowID) =>
            <ShoutRow
              onImageHide={() => this.setState({imageIsShowing: false})}
              onLikePress={() => this.onLikePress(rowID)}
              onDeleteShoutout={() => this.onDeleteShoutout(rowID)}
              onUserPress={() => {}}
              onImagePress={() => this.onImagePress(this.props.myShoutouts[rowID])}
              shoutout={rowData}
              profileId={this.props.profileId}
              ></ShoutRow>}>
        </ListView>
      );
    }
  },

  onLikePress(rowID) {
    let { id, liked } = this.props.myShoutouts[rowID];

    let profileId = this.props.profileId;
    if (liked) {
      this.props.dispatch(dislikeShoutoutActionCreator(id, profileId, rowID, true)).then(
        (response) => {
          console.log('RESPONSE: ', response);
        }
      )
    } else {
      this.props.dispatch(likeShoutoutActionCreator(id, profileId, rowID, true)).then(
        (response) => {
          console.log('RESPONSE: ', response);
        }
      )
    }
  },

  onDeleteShoutout(rowID) {
    let { id } = this.props.myShoutouts[rowID];
    let profileId = this.props.profileId;
    this.props.dispatch(deleteShoutoutActionCreator(profileId, id, rowID, true)).then(
      (response) => {
        console.log('RESPONSE: ', response);
      }
    )
  },

  checkDefaultSegment(segment) {
    switch (segment) {
      case 'fester':
        return 0
        break;
      case 'shoutouts':
        return 1
        break;
    }
  },

  onRowPress(party) {
    this.props.navigator.push({name: 'genericParty', data: {partyId: party.party_id}})
  },

  renderHeader() {
    return (
      <View style={styles.topWrapper}>
        <View style={styles.profileWrapper}>
          <View style={styles.profilePicWrapper}>
            {this.renderProfilePic()}
            <Text style={styles.usernameText}>{this.props.name}</Text>
          </View>
          <View style={styles.editWrapper}>
            <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.onEditProfilePress()}
            >
              <Text style={styles.editButtonText}>{strings.EDIT}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.achievementWrapper}>
          <Text style={styles.bio}>{this.props.bio}</Text>
        </View>
        <View style={{marginRight: 30, marginLeft: 30}}>
          {this.renderSegmentControl()}
        </View>
      </View>
    );
  },

  getOptions() {
    return [
      {
        label: 'Fester',
        value: 0
      },
      {
        label: 'Shoutouts',
        value: 1
      }
    ]
  },

  renderSegmentControl() {
    if (Platform.OS === 'ios') {
      return (
        <SegmentedControlIOS
          tintColor={'#FF0055'}
          values={['Fester', 'Shoutouts']}
          selectedIndex={this.checkDefaultSegment(this.state.segment)}
          onChange={(event) => this.onSegmentChange(event)}
        />
      );
    } else {
      return <SegmentedControls
          tint= {'#ff0055'}
          selectedTint= {'white'}
          backTint= {'white'}
          optionContainerStyle={{
            flex: 1
          }}
          options={this.getOptions()}
          optionStyle= {{
            fontSize: 12,
          }}
          containerStyle={{
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1
          }}
          extractText={(option) => option.label}
          onSelection={(selected) => this.onSegmentChangeAndroid(selected)}
          selectedIndex={this.state.androidIndex}
        />
    }
  },

  onSegmentChange(event) {
    let sexValue;
    switch (event.nativeEvent.selectedSegmentIndex) {
      case 0:
        this.setState({segment: 'fester'});
        break;
      case 1:
        this.setState({segment: 'shoutouts'});
        break;
    }
  },

  onSegmentChangeAndroid(event) {
    switch (event.value) {
      case 0:
        this.setState({segment: 'fester', androidIndex: 0});
        break;
      case 1:
        this.setState({segment: 'shoutouts', androidIndex: 1});
        break;
    }
  },

  renderShoutoutHeader() {
    if (this.props.shoutoutsIsEmpty) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No shoutouts</Text>
        </View>
      );
    }
  },


  onImagePress(shoutout) {
    this.setState({
      imageIsShowing: true,
      image: shoutout.image,
      caption: shoutout.text,
      captionPosition: shoutout.caption_position
    });
  },

  onEditProfilePress() {
    this.props.navigator.push({name: 'editProfile'});
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
          <Text style={[styles.imageCaption, {top: (this.state.captionPosition * height) / 100}]}>{this.state.caption}</Text>
        );
      }
    },

  renderErrorView() {
    if (this.state.noConnection) {
      console.log('ERROR VIEW RENDER CALLED');
      return <ErrorView/>
    }
  },

  onBackPress() {
    this.props.navigator.pop();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  listView: {
    flex: 1,
  },
  topWrapper: {
    height: height / 4.5,
    paddingBottom: 8,
    backgroundColor: 'white'
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
  sectionHeader: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  sectionHeaderText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#4A4A4A',
    fontWeight: '500'
  },
  circle: {
    marginLeft: 5,
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: 'red'
  },
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    flex: 1.2,
  },
  profilePicWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flex: 4
  },
  usernameText: {
    marginLeft: 10,
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: '500'
  },
  editWrapper: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: '#4A4A4A'
  },
  editButtonText: {
    fontSize: 12,
    color: '#4A4A4A'
  },
  achievementWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10
  },
  bottomWrapper: {
    flex: 3,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#C8C7CC'
  },
  fullImage: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    width: width
  },
  imageCaption: {
    fontSize: 18,
    position: 'absolute',
    width: 140,
    left: 0,
    padding: 5,
    color: 'white',
    backgroundColor: '#FF0055'
  },
  bio: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: '500'
  },
  emptyView: {
    //flex: 1,
    height: height / 2.8,
    width: width,
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.95
  },
});

function select(store) {
  return {
    name: store.user.firstname + ' ' + store.user.lastname,
    fbid: store.user.fbid,
    city: store.location.city,
    myParties: store.user.parties,
    myShoutouts: store.user.shoutouts,
    profileId: store.user.profileId,
    bio: store.user.bio,
    image: store.user.image,
    location: store.location,
    shoutoutsIsEmpty: store.user.shoutoutsIsEmpty,
    partiesIsEmpty: store.user.partiesIsEmpty
  }
}

module.exports = connect(select)(MyProfile);
