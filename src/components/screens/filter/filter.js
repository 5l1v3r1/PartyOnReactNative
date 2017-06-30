import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider,
  ScrollView
} from 'react-native';
const NavigationBar = require('react-native-navbar');

const { connect } = require('react-redux');
const _ = require('lodash');
const GenderRow = require('../event/input-components/sex-row');
const SliderRow = require('../event/input-components/slider-row');
const CalendarRow = require('../event/input-components/date-row');
import DistanceSliderRow from './distance-slider';
const {
  setFilterActionCreator,
  setFilterGender,
  setFilterAge,
  setFilterDistance
 } = require('../../../actions');
const strings = require('../../../strings/strings');

var Filter = React.createClass({

  getInitialState() {
    return {
      scrollEnabled: true,
      isLoading: false
    }
  },

  render() {
    const titleConfig = {
      title: 'Filter',
      tintColor: 'black'
    };

    const rightButtonConfig = {
      title: strings.showHits,
      tintColor: '#FF0055',
      handler: () => {
        this.setState({isLoading: true})
        this.props.dispatch(setFilterActionCreator(this.props.profileId, this.props.location, this.props.filter, false)).then(
          (result) => {
            this.setState({isLoading: false})
            this.props.navigator.pop();
          }
        );
      }
    };

    const leftButtonConfig = {
      title: strings.close,
      tintColor: '#FF0055',
      handler: () => {
        const { navigator } = this.props;
        navigator.pop();
      }
    };

    return(
      <View style={styles.container}>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
          />
        <ScrollView
          style={styles.contentWrapper}
          scrollEnabled={this.state.scrollEnabled}
          >
          <GenderRow text={strings.wantToPartyWith}
            defaultValue={this.props.filter.gender}
            onChange={(sexValue) => {
              this.props.dispatch(setFilterGender(sexValue))
            }}/>
            <View style={{height: 30}}/>
          <SliderRow
            title={strings.age}
            minValue={18}
            maxValue={50}
            onTouch={() => this.setState({scrollEnabled: false})}
            onRelease={() => this.setState({scrollEnabled: true})}
            defaultMin={this.props.filter.age_from}
            defaultMax={this.props.filter.age_to}
            minRange={5}
            onChange={
              _.debounce((data) => {
                this.props.dispatch(setFilterAge(data))
              }, 400)
            }/>
            <DistanceSliderRow
              title={strings.distance}
              defaultValue={this.props.filter.distance}
              onSlidingComplete={(distance) => this.props.dispatch(setFilterDistance(distance))}
              />
        </ScrollView>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  navBar: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
});

function select(store) {
  return {
    profileId: store.user.profileId,
    location: store.location,
    filter: store.filter,
  }
}

module.exports = connect(select)(Filter);
