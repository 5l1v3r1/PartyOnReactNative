import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ListView,
  Alert,
  PixelRatio,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from './backButtonNavItem';
const {
  loadPartyByIdActionCreator,
  acceptJoinRequestActionCreator,
  acceptInviteRequestActionCreator,
  deletePartyActionCreator,
  toggleBarStyle,
  partyRequested,
  joinPartyActionCreator,
  leavePartyAction,
  editPartyActionCreator,
  leavePartyActionCreator
 } = require('../../actions');
import { connect } from 'react-redux';
import GuestRow from '../screens/party/display-row-components/guests-row'
import DateRow from '../screens/party/display-row-components/date-row'
import ActionsRow from '../screens/event/input-components/actions-row'
import DistanceRow from '../screens/party/display-row-components/distance-row'
import AddressRow from '../screens/party/display-row-components/address-row'
import TimeRow from '../screens/party/display-row-components/time-row'
import GenderRow from '../screens/party/display-row-components/gender-row'
import RulesRow from '../screens/party/display-row-components/houseRules-row'
import AgeRow from '../screens/party/display-row-components/age-row'
import AchievementRow from '../screens/party/display-row-components/achievement-row'
import ProfilePic from './profilepic'
import FullWidthButton from './full-width-button'
import RoundedButtonSolid from './rounded-button-solid'

const strings = require('../../strings/strings');

let GenericParty = React.createClass({
  getInitialState() {
    return {
      hasLoaded: false,
      isLoading: false
    }
  },

  componentDidMount() {
    this.props.dispatch(loadPartyByIdActionCreator(this.props.data.partyId, this.props.profileId, this.props.location)).then(
      (result) => {
        console.log('LOAD PARTY RESULT: ', result);
        this.setState({hasLoaded: true});
        this.props.dispatch(toggleBarStyle());
      }
    )
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
  },

  render() {
    if (this.state.hasLoaded) {
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
              leftButton={<BackArrow color={'white'} onPress={() => this.props.navigator.pop()}/>}
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
                  <ProfilePic url={this.props.party.creator.image} size={'small'} style={{marginRight: 10}}/>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
                    {`${this.props.party.creator.firstname} ${this.props.party.creator.lastname}`}
                  </Text>
                </View>
                <View style={styles.botWrapper}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                    {this.props.party.title}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            </View>
          )}

          renderBackground={() => (
            <View key="background">
              <Image
                source={{uri: this.props.party.image}}
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
            <GuestRow guests={this.props.party.guestlist} onPress={() => this.onGuestsPress()}/>
            <DistanceRow distance={this.renderDistanceText()}/>
            {this.renderAddressRow()}
            <GenderRow gender={this.props.party.gender}/>
            <AgeRow ageFrom={this.props.party.age_from} ageTo={this.props.party.age_to}/>
            <TimeRow time={`${this.props.party.time_start} - ${this.props.party.time_end}`} />
            <DateRow date={new Date(this.props.party.date)}/>
            <RulesRow rules={this.props.party.houserules}/>
            {this.renderActionsRow()}
            {this.renderFullWidthButton()}
          </View>

        </ParallaxScrollView>
      );
    } else {
      return (
          <ActivityIndicator
            style={{flex: 1}}
            size='large'
            color='#FF0055'/>
      );
    }

  },

  renderAddressRow() {
    if (this.props.party.join_status === 'attending' || this.props.party.creator.profile_id === this.props.profileId) {
      return (
        <AddressRow location={this.props.party.location}/>
      );
    }
  },

  renderFullWidthButton() {
    if (this.props.party.creator.profile_id === this.props.profileId) {
      return(
        <FullWidthButton text={strings.editParty} onPress={() => {
            let data = {
              partyId: this.props.party.party_id,
            };
            this.props.dispatch(editPartyActionCreator(this.props.party));
            this.props.navigator.push({name: 'event', data: data});
          }}/>
      );
    } else {
      if (this.props.party.join_status === 'none') {
        return (
          <FullWidthButton text={strings.join} isLoading={this.state.isLoading} onPress={() => {
              this.setState({isLoading: true});
              let { party_id } = this.props.party;
              this.props.dispatch(joinPartyActionCreator(party_id, this.props.profileId, this.props.position, true))
                .then((result) => {
                  this.setState({isLoading: false});
                });
            }}/>
        );
      } else if (this.props.party.join_status === 'pending') {
        return (
          <FullWidthButton text={strings.pending} />
        );
      } else if (this.props.party.join_status === 'attending') {
        return (
          <FullWidthButton text={strings.notAttending} isLoading={this.state.isLoading} onPress={() => {
            this.setState({isLoading: true});
            let { party_id } = this.props.party;
            this.props.dispatch(leavePartyActionCreator(party_id, this.props.profileId, this.props.position, true)).then(
              (result) => {
                this.setState({isLoading: false});
              }
            )
          }}/>
        );
      }
      else if (this.props.party.join_status === 'invited') {
       return (
         <FullWidthButton text={strings.acceptInvite} isLoading={this.state.isLoading} onPress={() => {
           this.setState({isLoading: true});
           let { party_id } = this.props.party;
           this.props.dispatch(acceptInviteRequestActionCreator(party_id, this.props.profileId, this.props.position, true))
             .then((result) => {
               this.setState({isLoading: false});
             });
         }}/>
       );
     }

    }
  },

  renderActionsRow() {
    if (this.props.party.creator.profile_id === this.props.profileId) {
      return(
        <ActionsRow
          canDelete={true}
          onInvitePress={() => {
            this.props.navigator.push({name: 'invite', data: {party: this.props.party, fromParty: true}});
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

  renderShowmapButton() {
    if (this.props.party.join_status === 'attending') {
      return (
        <View style={styles.buttonWrapper}>
          <RoundedButtonSolid
            onPress={() => this.props.navigator.push({name: 'partyMap', data: this.props.party})}
            buttonText={strings.showMap}
            />
        </View>
      );
    }
  },

  renderDistanceText() {
    let { distance } = this.props.party;
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

  onAcceptDelete() {
    let { party_id } = this.props.party;
    this.props.dispatch(deletePartyActionCreator(party_id, this.props.profileId, this.props.position, true)).then(
      (result) => {
        this.props.navigator.pop();
      }
    )
  },

  onGuestsPress() {
    if (this.props.party.guestlist.length > 0) {
      this.props.navigator.push({name: 'guests', data: { partyId: this.props.party.party_id, creatorId: this.props.party.creator.profile_id}});
    }
  }

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
    party: store.party.party,
    profileId: store.user.profileId,
    location: store.location
  }
}

module.exports = connect(select)(GenericParty);
