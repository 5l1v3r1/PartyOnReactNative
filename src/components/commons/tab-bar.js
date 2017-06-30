import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const HomeIcon = require('../../resources/tabs/home@2x.png');
const ShoutIcon = require('../../resources/tabs/shout@2x.png');
const MessagesIcon = require('../../resources/tabs/inbox@2x.png');
const ProfileIcon = require('../../resources/tabs/profile@2x.png');
const HomeIconActive = require('../../resources/tabs/home-active@2x.png');
const ShoutIconActive = require('../../resources/tabs/shout-active@2x.png');
const MessagesIconActive = require('../../resources/tabs/inbox-active@2x.png');
const ProfileIconActive = require('../../resources/tabs/profile-active@2x.png');

const AndroidTabBar = React.createClass({
  tabIcons: [HomeIcon, ShoutIcon, MessagesIcon, ProfileIcon],
  tabIconsActive: [HomeIconActive, ShoutIconActive, MessagesIconActive, ProfileIconActive],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  render() {
  return <View style={[styles.tabs, this.props.style]}>
    {this.props.tabs.map((tab, i) => {
      return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
        <Image
          source={this.props.activeTab === i ? this.tabIconsActive[i] : this.tabIcons[i]}
        />
        {this.renderBadgeView(i)}
      </TouchableOpacity>;
    })}
  </View>;
  },

  renderBadgeView(index) {
    if (index == 2) {
      if (this.props.chatCount > 0) {
        return (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{this.props.chatCount}</Text>
          </View>
        );
      }
    }

    if (index == 3) {
      if (this.props.notificationCount > 0) {
        return (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{this.props.notificationCount}</Text>
          </View>
        );
      }
    }
  }

});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500'
  },
  badge: {
    height: 22,
    width: 22,
    position: 'absolute',
    top: 0,
    right: 25,
    borderRadius: 11,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = AndroidTabBar;
