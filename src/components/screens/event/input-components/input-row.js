import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image
} from 'react-native';

const strings = require('../../../../strings/strings');

module.exports = React.createClass({

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.icon} source={this.props.icon}></Image>
            {this.renderTitle()}
          </View>
        </View>
        <View style={styles.bottomView}>
          <TextInput
            multiline={true}
            selectionColor={'#ff0055'}
            style={[styles.input, {height: this.props.height}]}
            returnKeyType={'done'}
            blurOnSubmit={true}
            onChangeText={(text) => {
              this.props.onChangeText(text);
            }}
            defaultValue={this.props.value}
            placeholder={this.props.placeholder}
            placeholderTextColor={'#4A4A4A'}
            />
        </View>
      </View>
    );
  },

  renderTitle() {
    if (this.props.isMissing) {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          {this.renderErrorText()}
        </View>
      );
    } else {
      return(
        <Text style={styles.titleText}>{this.props.title}</Text>
      );
    }
  },

  renderErrorText() {
    if (this.props.title === strings.title) {
      return (
        <Text style={styles.errorText}>{strings.missingTitle}</Text>
      );
    } else {
      return (
        <Text style={styles.errorText}>{strings.missingHouserules}</Text>
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginBottom: 10,
  },
  topView: {
    flex: 2,
  },
  titleView: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9B9B9B',
  },
  bottomView: {
    flex: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: 14,
    padding: 5,
    fontStyle: 'italic',
    borderRadius: 5,
    backgroundColor: '#EFEFF4'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    fontStyle: 'italic'
  }
})
