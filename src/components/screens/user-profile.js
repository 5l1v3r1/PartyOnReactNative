import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView,
  RefreshControl,
  SegmentedControlIOS,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

const TimerMixin = require('react-timer-mixin');
const NavigationBar = require('react-native-navbar');
const ProfilePic = require('../commons/profilepic');
const PartyRow = require('../tabs/home/partyrow');
const ShoutRow = require('../tabs/shouts/shout-row');
const Achievement = require('../commons/achievement');
const BackArrow = require('../commons/backButtonNavItem');
const EmptyRow = require('../commons/empty-row');
const strings = require('../../strings/strings');
import { SegmentedControls } from 'react-native-radio-buttons';
const {
  getUserParties,
  getShoutoutsById,
  likeShoutout,
  dislikeShoutout } = require('../../api/PartyOnAPI');
const {
  toggleBarStyle,
  dislikeShoutoutActionCreator,
  likeShoutoutActionCreator
 } = require('../../actions');
const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';

const ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });

var UserProfile = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    var { data, sectionsIds } = this.renderListViewData([]);
    return {
      parties: [],
      shoutouts: [],
      segment: 'fester',
      dataSource: ds.cloneWithRowsAndSections(data, sectionsIds),
      partiesRefreshing: false,
      shoutoutsRefreshing: false,
      imageIsShowing: false,
      shoutoutIsEmpty: false,
      partiesIsEmpty: false,
      image: '',
      caption: '',
      androidIndex: 0,
      captionPosition: 40,
    }
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

  componentDidMount() {

    this.setTimeout(() => {
      this.setState({partiesRefreshing: true});
      getUserParties(this.props.data.profile_id, this.props.profileId, this.props.location)
        .then((response) => {
          if (response.length === 0) {
            this.setState({
              partiesIsEmpty: true,
              partiesRefreshing: false
            });
          } else {
            for (party of response) {
              party.date = party.date * 1000
            }
            var { data, sectionIds } = this.renderListViewData(response);
            this.setState({
              dataSource: ds.cloneWithRowsAndSections(data, sectionIds),
              partiesRefreshing: false,
              partiesIsEmpty: false
            })
          }

        });

      getShoutoutsById(this.props.data.profile_id, this.props.profileId).then(
        (response) => {
          if (!response.empty) {
            this.setState({
              shoutoutsRefreshing: false,
              shoutouts: response,
              shoutoutIsEmpty: false
            });
          } else {
            this.setState({
              shoutouts: [],
              shoutoutIsEmpty: true,
              shoutoutsRefreshing: false
            })
          }
        }
      )
    }, 500);
  },

  renderNavigationBar() {
    return (
      <NavigationBar
        title={{title: this.renderUsername()}}
        leftButton={<BackArrow onPress={() => {this.onBackPress()}}/>}
        />
    );
  },

  renderProfilePic() {
    if (this.props.id !== null) {
      return(
        <ProfilePic url={this.props.data.image}/>
      );
    }
  },

  renderUsername() {
    return `${this.props.data.firstname} ${this.props.data.lastname}`;
  },

  onPartiesRefresh() {
    this.setState({partiesRefreshing: true});
    getUserParties(this.props.data.profile_id, this.props.profileId, this.props.location)
      .then((response) => {
        var { data, sectionIds } = this.renderListViewData(response);
        this.setState({
          dataSource: ds.cloneWithRowsAndSections(data, sectionIds),
          partiesRefreshing: false
        })
      });
  },

  onShoutoutsRefresh() {
    this.setState({shoutoutsRefreshing: true});
    getShoutoutsById(this.props.data.profile_id, this.props.profileId).then(
      (response) => {
        if (!response.empty) {
          this.setState({
            shoutoutsRefreshing: false,
            shoutouts: response,
            shoutoutIsEmpty: false
          });
        } else {
          this.setState({
            shoutouts: [],
            shoutoutIsEmpty: true,
            shoutoutsRefreshing: false
          })
        }
      }
    )
  },

  renderSectionHeader(data, sectionId) {
    const icon = require('../../resources/title-icon@2x.png');
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

  renderList() {
    if (this.state.segment === 'fester') {
      return (
        <ListView
          style={styles.listView}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderSectionHeader={(data, sectionId) => this.renderSectionHeader(data, sectionId)}
          refreshControl={
            <RefreshControl
              tintColor={'#FF0055'}
              refreshing={this.state.partiesRefreshing}
              onRefresh={() => this.onPartiesRefresh()}
              />
          }
          //renderHeader={() => this.renderHeader()}
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
          dataSource={ds.cloneWithRows(this.state.shoutouts)}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          renderRow={(rowData, sectionID, rowID) =>
            <ShoutRow
              onImageHide={() => this.setState({imageIsShowing: false})}
              onLikePress={() => this.onLikePress(rowData)}
              onDeleteShoutout={() => this.onDeleteShoutout(rowID)}
              onUserPress={() => {}}
              onImagePress={() => this.onImagePress(this.state.shoutouts[rowID])}
              shoutout={rowData}
              profileId={this.props.profileId}
              ></ShoutRow>}>
        </ListView>
      );
    }

  },

  onRowPress(party) {
    this.props.dispatch(toggleBarStyle());
    this.props.navigator.push({name: 'genericParty', data: {partyId: party.party_id}})
  },

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
        <View style={styles.separator}></View>
        {this.renderHeader()}
        <View style={styles.bottomWrapper}>
          {this.renderList()}
        </View>
        {this.renderFullImage()}
      </View>
    );
  },

  renderHeader() {
    return(
      <View style={styles.topWrapper}>
        <View style={styles.profileWrapper}>
          <View style={styles.profilePicWrapper}>
            {this.renderProfilePic()}
            <Text style={styles.usernameText}>{this.renderUsername()}</Text>
          </View>
          <View style={styles.editWrapper}>
            <TouchableOpacity style={styles.editButton} onPress={() => this.onInvitePress()}>
              <Text style={styles.editButtonText}>INVITE</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.onStartChatPress()}
            >
              <Text style={styles.editButtonText}>CHAT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.achievementWrapper}>
          {this.renderBio()}
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
          selectedIndex={0}
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

  renderBio() {
    if (this.props.data.bio == null) {
      return <Text style={styles.noBio}>{strings.noBio}</Text>
    } else {
      return <Text style={styles.bio}>{this.props.data.bio}</Text>
    }
  },

  onStartChatPress() {
    this.props.navigator.push({name: 'chat', profile: this.props.data});
  },

  onInvitePress() {
    this.props.navigator.push({name: 'inviteUser', profile: this.props.data})
  },

  onLikePress(shoutout, rowID) {
    let { id, liked } = shoutout;

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

  renderShoutoutHeader() {
    if (this.state.shoutoutIsEmpty) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No shoutouts</Text>
        </View>
      );
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

  onImagePress(shoutout) {
    this.setState({
      imageIsShowing: true,
      image: shoutout.image,
      caption: shoutout.text,
      captionPosition: shoutout.caption_position
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
        <Text style={[styles.imageCaption, {top: (this.state.captionPosition * height) / 100}]}>{this.state.caption}</Text>
      );
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
  navbarName: {
    textAlign: 'center',
    fontSize: 15,
    color: '#424242',
    fontWeight: 'bold'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#C8C7CC'
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
  editWrapper: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  bio: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: '500'
  },
  noBio: {
    fontStyle: 'italic',
    fontSize: 14,
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
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 15,//
    textAlign: 'center',
    letterSpacing: 0.95
  },
});

function select(store) {
  return {
    profileId: store.user.profileId,
    location: store.location
  }
}

module.exports = connect(select)(UserProfile);
