import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ListView,
  PixelRatio,
  BackAndroid,
  TouchableOpacity
} from 'react-native';

const strings = require('../../../strings/strings');

const NavigationBar = require('react-native-navbar');
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const RoundedButtonSolid = require('../../commons/rounded-button-solid');
import LinearGradient from 'react-native-linear-gradient';

const BackArrow = require('../../commons/backButtonNavItem');
const GuestRow = require('./display-row-components/guests-row');
const DistanceRow = require('./display-row-components/distance-row');
const TimeRow = require('./display-row-components/time-row');
const DateRow = require('./display-row-components/date-row');
const GenderRow = require('./display-row-components/gender-row');
const RulesRow = require('./display-row-components/houseRules-row');
const AgeRow = require('./display-row-components/age-row');
const AddressRow = require('./display-row-components/address-row');
const AchievementRow = require('./display-row-components/achievement-row');
const ProfilePic = require('../../commons/profilepic');
const FullWidthButton = require('../../commons/full-width-button');
const ActionsRow = require('../../screens/event/input-components/actions-row');

const { connect } = require('react-redux');
const { toggleBarStyle,
  joinPartyActionCreator,
  editPartyActionCreator,
  leavePartyActionCreator,
  deletePartyActionCreator,
  acceptInviteRequestActionCreator
} = require('../../../actions');

let Party = React.createClass({
  getInitialState() {
    let creator;
    let { profile_id } = this.props.parties[this.props.position];

    if (profile_id === this.props.profileId) {
      creator = true;
    } else {
      creator = false;
    }
    return {
      creator: creator,
      isLoading: false
    }
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
  },

  _close() {
    const { navigator } = this.props;
    navigator.pop();
  },

  render() {
    return(
      <ParallaxScrollView
        contentBackgroundColor='white'
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}

        renderFixedHeader={() => (
          <LinearGradient
            colors={['rgba(0,0,0,.50)', 'rgba(0,0,0,.25)', 'rgba(0,0,0,.12)']}>
          <NavigationBar
            key="fixed-header"
            style={styles.navBar}
            tintColor={'transparent'}
            leftButton={<BackArrow color={'white'} onPress={() => {this._close()}}/>}
            rightButton={
              this.renderShowmapButton()
            }
            />
          </LinearGradient>
        )}

        renderForeground={() => (
          <View key="parallax-header" style={ styles.parallaxHeader }>
            <LinearGradient
              colors={['rgba(0,0,0,.12)', 'rgba(0,0,0,.25)', 'rgba(0,0,0,.50)']}>
            <View style={{paddingLeft: 10, paddingBottom: 20, paddingTop: 10, width: window.width,}}>
              <View style={styles.topWrapper}>
                <ProfilePic url={this.props.parties[this.props.position].creator.image} size={'small'} style={{marginRight: 10}}/>
                <TouchableWithoutFeedback onPress={() => this.onUserPress()}>
                  <View>
                    <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
                      {`${this.props.parties[this.props.position].creator.firstname} ${this.props.parties[this.props.position].creator.lastname}`}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.botWrapper}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                  {this.props.parties[this.props.position].title}
                </Text>
              </View>
            </View>
          </LinearGradient>
          </View>
        )}

        renderBackground={() => (
          <View key="background">
            <Image
              source={this.props.parties[this.props.position].image ? {uri: this.props.parties[this.props.position].image} : require('../../../resources/Cup.png')}
               style={{
                 width: window.width,
                 height: PARALLAX_HEADER_HEIGHT
               }}
               />
            <View style={{
              position: 'absolute',
              top: 0,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT}}/>
          </View>
          )}>

        <View style={styles.bottomView}>
          <GuestRow guests={this.props.parties[this.props.position].guestlist} onPress={() => this.onGuestsPress()}/>
          <DistanceRow distance={this.renderDistanceText()}/>
          {this.renderAddressRow()}
          <GenderRow gender={this.props.parties[this.props.position].gender}/>
          <AgeRow ageFrom={this.props.parties[this.props.position].age_from} ageTo={this.props.parties[this.props.position].age_to}/>
          <TimeRow time={`${this.props.parties[this.props.position].time_start} - ${this.props.parties[this.props.position].time_end}`} />
          <DateRow date={new Date(this.props.parties[this.props.position].date)}/>
          <RulesRow rules={this.props.parties[this.props.position].houserules}/>
          {this.renderActionsRow()}
          {this.renderFullWidthButton()}
        </View>

      </ParallaxScrollView>
    );
  },

  renderAddressRow() {
    if (this.props.parties[this.props.position].join_status === 'attending' || this.state.creator) {
      return (
        <AddressRow location={this.props.parties[this.props.position].location}/>
      );
    }
  },

  renderFullWidthButton() {
    if (this.state.creator) {
      return(
        <FullWidthButton text={strings.editParty} onPress={() => {
            let data = {
              partyId: this.props.parties[this.props.position].party_id,
              rowID: this.props.position
            };
            this.props.dispatch(editPartyActionCreator(this.props.parties[this.props.position]));
            this.props.navigator.push({name: 'event', data: data});
          }}/>
      );
    } else {
      if (this.props.parties[this.props.position].join_status === 'none') {
        return (
          <FullWidthButton text={strings.join} isLoading={this.state.isLoading} onPress={() => {
              this.setState({isLoading: true});
              let { party_id } = this.props.parties[this.props.position];
              this.props.dispatch(joinPartyActionCreator(party_id, this.props.profileId, this.props.position))
                .then((result) => {
                  this.setState({isLoading: false});
                  this.props.dispatch();
                });
            }}/>
        );
      } else if (this.props.parties[this.props.position].join_status === 'pending') {
        return (
          <FullWidthButton text={strings.pending} />
        );
      } else if (this.props.parties[this.props.position].join_status === 'attending') {
        return (
          <FullWidthButton text={strings.notAttending} isLoading={this.state.isLoading} onPress={() => {
            this.setState({isLoading: true});
            let { party_id } = this.props.parties[this.props.position];
            this.props.dispatch(leavePartyActionCreator(party_id, this.props.profileId, this.props.position)).then(
              (result) => {
                this.setState({isLoading: false});
              }
            )
          }}/>
        );
      } else if (this.props.parties[this.props.position].join_status === 'invited') {
        return (
          <FullWidthButton text={strings.acceptInvite} isLoading={this.state.isLoading} onPress={() => {
            this.setState({isLoading: true});
            let { party_id } = this.props.parties[this.props.position];
            this.props.dispatch(acceptInviteRequestActionCreator(party_id, this.props.profileId, this.props.position))
              .then((result) => {
                this.setState({isLoading: false});
              });
          }}/>
        );
      }

    }
  },

  renderDistanceText() {
    let { distance } = this.props.parties[this.props.position];
    switch (distance) {
      case 'distanceVeryClose':
        return strings.distanceVeryClose
        break;
      case 'distanceClose':
        return strings.distanceClose
        break;
        default:
        return `${distance} ${strings.away}`;
      }
    },

  renderActionsRow() {
    if (this.state.creator) {
      return(
        <ActionsRow
          canDelete={true}
          onInvitePress={() => {
            this.props.navigator.push({name: 'invite', data: {party: this.props.parties[this.props.position], fromParty: true}});
          }}
          onDeletePress={() => {
            Alert.alert(
              'Slett fest',
              'Er du sikkert på at du vil slette festen?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.onAcceptDelete()},
              ]
            )
          }}
          />
      );
    }
  },

  onAcceptDelete() {
    let { party_id } = this.props.parties[this.props.position];
    this.props.dispatch(deletePartyActionCreator(party_id, this.props.profileId, this.props.position)).then(
      (result) => {
        this.props.navigator.pop();
      }
    )
  },

  renderShowmapButton() {
    if (this.props.parties[this.props.position].join_status === 'attending') {
      return (
        <View style={styles.buttonWrapper}>
          <RoundedButtonSolid
            onPress={() => this.props.navigator.push({name: 'partyMap', data: this.props.parties[this.props.position]})}
            buttonText={strings.showMap}
            />
        </View>
      );
    }
  },

  onGuestsPress() {
    if (this.props.parties[this.props.position].guestlist.length > 0) {
      this.props.navigator.push({name: 'guests', data: {partyId: this.props.parties[this.props.position].party_id, creatorId: this.props.parties[this.props.position].creator.profile_id}});
    }
  },

  onUserPress() {
    this.props.navigator.push({name: 'userProfile', data: this.props.parties[this.props.position].creator});
  },
});

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  parallaxHeader: {
    alignItems: 'flex-start',
    flex: 1,
    width: window.width,
    justifyContent: 'flex-end',
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  buttonWrapper: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botWrapper: {
    paddingTop: 10
  },
  bottomView: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'space-between',
  }
});

function select(store) {
  return {
    barStyle: store.navigation.barStyle,
    profileId: store.user.profileId,
    parties: store.party.parties
  }
}

module.exports = connect(select)(Party);
