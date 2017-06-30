import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

const TimerMixin = require('react-timer-mixin');

const NavigationBar = require('react-native-navbar');
const ParallaxScrollView = require('react-native-parallax-scroll-view');
const RoundedButtonSolid = require('../../commons/rounded-button-solid');
const FullWidthBtn = require('../../commons/full-width-button');
import LinearGradient from 'react-native-linear-gradient';
const strings = require('../../../strings/strings');
const InputRow = require('./input-components/input-row');
const SexRow = require('./input-components/sex-row');
const PlaceRow = require('./input-components/place-row');
const SliderRow = require('./input-components/slider-row');
const AvailabilityRow = require('./input-components/availability-row');
const DateRow = require('./input-components/date-row');
const ActionsRow = require('./input-components/actions-row');
const _ = require('lodash');
const { connect } = require('react-redux');
const {
  toggleBarStyle,
  createPartyActionCreator,
  updatePartyActionCreator,
  geocodeAddressActionCreator,
  getAddressActionCreator,
  setTitle,
  setHouserules,
  setEventAddress,
  setGender,
  setRegion,
  setAge,
  setTime,
  setDate,
  setPrivate,
  clearEvent
 } = require('../../../actions');


var Event = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    let position;
    if (this.props.event.fromEdit) {
      position = {
        latitude: this.props.event.lat,
        longitude: this.props.event.lng
      }
    } else {
      position = {
        latitude: this.props.position.latitude,
        longitude: this.props.position.longitude
      }
    }

    return {
      mapReadyToLoad: false,
      isLoading: false,
      position: position,
      pictureMissing: false,
      titleMissing: false,
      houserulesMissing: false,
      addressMissing: false,
      genderMissing: false,
      scrollEnabled: true,
    };
  },

  componentDidMount() {
    this.props.dispatch(toggleBarStyle());
    this.setTimeout(
      () => {
        this.setState({
          mapReadyToLoad: true
        });
      },
      700
    );
  },

  componentWillUnmount() {
    this.props.dispatch(toggleBarStyle());
    if (this.props.event.fromEdit) {
      this.props.dispatch(clearEvent());
    }
  },

  _close() {
    const { navigator } = this.props;
    navigator.pop();
  },

  renderMap() {
    if (!this.state.mapReadyToLoad) {
      return <View style={{height: 300}}></View>
    } else {
      return <PlaceRow
        position={this.state.position}
        address={this.props.event.address}
        hasError={this.state.addressMissing}
        onChangeText={
          _.debounce((text) => {
            this.setState({addressMissing: false});
            this.props.dispatch(setEventAddress(text));
          }, 400)
        }
        onRegionChangeComplete={(position) => {
          // this.props.dispatch(getAddressActionCreator(position)).then(
          //   (result) => {
          //     //console.log('SET ADDRESS FIELD WITH: ', `${result.streetName} ${result.streetNumber}`);
          //   }
          // )
          this.setState({
            position: position
          });
          this.props.dispatch(setRegion(position));
        }}
        />
    }
  },

  onChoosePicPress() {
    if (this.props.event.fromEdit) {
      this.props.navigator.push({name: 'picture', data: {fromEdit: true}});
    } else {
      this.props.navigator.push({name: 'picture', data: {fromEdit: false}});
    }
  },

  renderPictureText() {
    if (!this.state.pictureMissing && !this.props.event.picture) {
      return <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>{`${strings.choosePartyPic}🎉`}</Text>
    } else {
      return <Text style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{`${strings.missingPicture}`}</Text>
    }
  },

  renderForeground() {
    if (!this.props.event.picture) {
      return (
        <View key="foreground" style={styles.foreground}>
          {this.renderPictureText()}
          <TouchableOpacity onPress={() => this.onChoosePicPress()}>
            <Image
              source={require('../../../resources/ic_add_a_photo_white_36pt_2x.png')}
              />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View key="foreground" style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={() => this.onChoosePicPress()}>
          <Text style={{color: 'white'}}>{strings.otherPic}</Text>
        </TouchableOpacity>
      </View>
    )
  },

  getPictureSource() {
    if (this.props.event.fromEdit && !this.props.event.hasChangedImageFromEdit) {
      return {uri: this.props.event.image}
    } else if (this.props.event.fromEdit && this.props.event.hasChangedImageFromEdit) {
      return this.props.event.picture
    } else {
      return this.props.event.picture
    }
  },

  render() {
    return(
      <ParallaxScrollView
        contentBackgroundColor='white'
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        scrollEnabled={this.state.scrollEnabled}
        ref={(c) => this.scrollView = c}
        renderFixedHeader={() => (
          <LinearGradient
            colors={['rgba(0,0,0,.50)', 'rgba(0,0,0,.25)', 'rgba(0,0,0,.12)']}>
          <NavigationBar
            key="fixed-header"
            style={styles.navBar}
            statusBar={{style: 'light-content'}}
            tintColor={'transparent'}
            leftButton={{title: strings.close, tintColor: 'white', handler: () =>{
              this.props.navigator.pop();
            }}}
            />
          </LinearGradient>
        )}

        renderForeground={() => this.renderForeground()}

        renderBackground={() => (
          <View key="background">
            <Image
              source={this.getPictureSource()}
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
          )}
        >
        <View style={{flex: 1}}>
          <InputRow
            title={strings.title}
            isMissing={this.state.titleMissing}
            icon={require('../../../resources/title-icon@2x.png')}
            placeholder={strings.titleForParty}
            value={this.props.event.title}
            onChangeText={
              _.debounce((text) => {
                this.setState({titleMissing: false});
                this.props.dispatch(setTitle(text));
              }, 400)
            }
            height={60}/>
            <InputRow
              title={strings.houserules}
              isMissing={this.state.houserulesMissing}
              icon={require('../../../resources/hammer@2x.png')}
              placeholder={strings.houserules}
              value={this.props.event.houserules}
              onChangeText={
                _.debounce((text) => {
                this.setState({houserulesMissing: false});
                  this.props.dispatch(setHouserules(text));
                }, 400)
              }
              height={80}/>
            <SexRow
              text={strings.gender}
              isMissing={this.state.genderMissing}
              defaultValue={this.props.event.gender}
              onChange={(sexValue) => {
                this.setState({genderMissing: false});
                this.props.dispatch(setGender(sexValue));
              }}
              />
            {this.renderMap()}
            <SliderRow
              title={strings.age}
              minValue={18}
              maxValue={40}
              defaultMin={this.props.event.age_from}
              defaultMax={this.props.event.age_to}
              onTouch={() => this.setState({scrollEnabled: false})}
              onRelease={() => this.setState({scrollEnabled: true})}
              minRange={5}
              onChange={
                _.debounce((data) => {
                  this.props.dispatch(setAge(data));
                }, 400)
              }
              />
            <SliderRow
              title={strings.time}
              minValue={16}
              maxValue={29}
              defaultMin={this.props.event.time_start}
              defaultMax={this.props.event.time_end}
              onTouch={() => this.setState({scrollEnabled: false})}
              onRelease={() => this.setState({scrollEnabled: true})}
              minRange={1}
              onChange={
                _.debounce((data) => {
                  this.props.dispatch(setTime(data));
                }, 400)
              }
              />
            <AvailabilityRow
              initialValue={false}
              onValueChange={(value) => {
                this.props.dispatch(setPrivate(value));
              }}
              />
            <DateRow
              date={this.props.event.fromEdit ? new Date(this.props.event.date) : new Date(this.props.event.date)}
              onDateChange={(date) => {
                this.props.dispatch(setDate(date));
              }
                }
              />
            <View style={{marginTop: 25}}>
            <ActionsRow
              onInvitePress={() => {
                this.props.navigator.push({name: 'invite', data: {fromParty: false}})
              }}
              onMorePress={() => alert('More pressed')}
              />
            </View>
            <FullWidthBtn
              isLoading={this.state.isLoading}
              text={this.props.event.fromEdit ? strings.save : strings.publish}
              onPress={() => this.publishPress()}/>
        </View>
      </ParallaxScrollView>

    );
  },

  onAgeChange(data) {

  },

  onTimeChange(data) {

  },

  publishPress() {
    if (this.validateInputComponents(this.props.event)) {
      this.setState({
        isLoading: true,
      });
      if (this.props.event.fromEdit) {
        let { partyId, rowID } = this.props.data;
        this.props.dispatch(updatePartyActionCreator(this.props.event, partyId, rowID))
          .then(() => {
            this.props.dispatch(clearEvent());
            this.setState({
              isLoading: false
            });
            this._close();
          });
      } else {
        this.props.dispatch(createPartyActionCreator(this.props.event))
          .then(() => {
            this.props.dispatch(clearEvent());
            this.setState({
              isLoading: false
            });
            this._close();
          });
      }
    }
  },

  validateInputComponents(party) {
    let sinners = [];
    for (let key in party) {
       if (party[key] === null || party[key] === '') {
         sinners.push(key);
       }
   }

   if (sinners.length > 0) {
     this.setErrorMessages(sinners);
     return false;
   } else {
     return true;
   }
 },

  setErrorMessages(sinners) {
    for(sinner of sinners) {
      switch (sinner) {
        case 'title':
          this.setState({titleMissing: true});
          break;
        case 'houserules':
          this.setState({houserulesMissing: true});
          break;
        case 'gender':
          this.setState({genderMissing: true});
          break;
        case 'picture':
          this.setState({pictureMissing: true});
          break;
        case 'address':
          this.setState({addressMissing: true});
          break;
      }
    }
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

});

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  foreground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  buttonWrapper: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

function select(store) {
  return {
    city: store.location.city,
    position: {
      latitude: store.location.latitude,
      longitude: store.location.longitude
    },
    event: store.event,
    profileId: store.user.profileId,
    barStyle: store.navigation.barStyle
  }
}

module.exports = connect(select)(Event);
