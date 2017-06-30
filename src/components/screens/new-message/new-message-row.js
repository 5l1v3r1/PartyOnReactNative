import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const ProfilePic = require('../../commons/profilepic');

module.exports = React.createClass({
  render() {
    return(
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={styles.container}>
        <ProfilePic
          style={styles.image}
          size={'small'}
          url={this.props.rowData.image}
          />
        <Text style={styles.name}>
          {`${this.props.rowData.firstname} ${this.props.rowData.lastname}`}
        </Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  }
})
