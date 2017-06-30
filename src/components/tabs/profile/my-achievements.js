import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const Achievement = require('../../commons/achievement');
const BackArrow = require('../../commons/backButtonNavItem');

module.exports = React.createClass({

  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = this.createMockDataSource();
    return {
      filter: '',
      data: data,
      dataSource: ds.cloneWithRows(data),
    };
  },

  createMockDataSource() {
    let dataSource = []
    for (achievement of MockAchievements.achievements) {
      dataSource.push(achievement);
    }
    return dataSource;
  },

  onBackPress() {
    this.props.navigator.pop();
  },

  render() {
    return(
      <View style={styles.container}>
        <NavigationBar
          title={{title: 'Mine premier'}}
          leftButton={<BackArrow onPress={() => {this.onBackPress()}}/>}
          />
        <View style={styles.contentWrapper}>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(achievement) => <Achievement type={achievement.type}></Achievement>}>
          </ListView>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentWrapper: {
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
