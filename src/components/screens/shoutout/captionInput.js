import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  PanResponder,
  Image,
  Text,
  Dimensions,
  Animated
} from 'react-native';

var {height, width} = Dimensions.get('window');
const strings = require('../../../strings/strings');

class CaptionInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      dragging: true,
      height: 50,
      width: width / 2 - 30,
      text: ''
    }
  }

  checkLineBreaks(text) {
    var eachLine = text.split('\n');
    if (eachLine.length >= 4) {
      return;
    } else {
      if (text > this.state.text) {
        if (text.length >= 12) {
          if (this.state.width <= (width / 2) - 30) {
            this.setState({
              width: this.state.width + 10
            })
          }
        }
      } else {
        if (text.length >= 12) {
          if (this.state.width >= (width / 2) - 30) {
            this.setState({
              width: this.state.width - 10
            })
          }
        }
      }
      this.setState({text: text});
      this.props.onChangeText(text);
    }
  }

  componentWillMount() {
    let mover = Animated.event([ null, {dy: this.state.pan.y}]);

    this._panResponder = PanResponder.create({
          onMoveShouldSetPanResponderCapture: () => true,
          onStartShouldSetPanResponderCapture: () => this.state.dragging,
          //onPanResponderTerminationRequest: () => true,

          onPanResponderGrant: (e, gestureState) => {
            // Set the initial value to the current state
            //this.props.shouldDisable();
            //this.props.shouldDisable();
            console.log('PAN-RESPONDER GRANT');
            this.setState({dragging: true})
            this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
            this.state.pan.setValue({x: 0, y: 0});
          },

          onPanResponderMove: (e, gestureState) => {
            if (gestureState.moveY >= height - 20) {
              return;
            } else if (gestureState.moveY <= 20) {
              return;
            } else {
              return mover(e, gestureState);
            }


          },

          onPanResponderRelease: (e, gestureState) => {
            // Flatten the offset to avoid erratic behavior
            this.setState({dragging: false});
            console.log('RESPONDER RELEEASE', gestureState);
            this.props.onPanYFinished(gestureState.moveY);
            this.state.pan.flattenOffset();
          }
        });

  }

  render() {
    // Destructure the value of pan from the state
    let { pan } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {transform: [{translateY}]};

    return (
      <View
        style={styles.container}>
        <Animated.View
        {...this._panResponder.panHandlers}
        style={[imageStyle, styles.inputWrapper]}
          >
          <TextInput
            style={[styles.captionInput, {height: this.state.height, width: this.state.width}]}
            ref={(ref) => this.props.refs(ref)}
            onContentSizeChange={(event) => {
              console.log('SIZE: ', event.nativeEvent.contentSize);
              this.setState({
                height: event.nativeEvent.contentSize.height,
                //width: this.state.width + 11
              })
            }}
            onLayout={(event) => {
              //console.log('EVENT: ', event.nativeEvent.layout.width);
              // this.setState({
              //   width: this.state.width + 11
              // })
            }}
            placeholder={'Add a caption'}
            multiline={true}
            value={this.state.text}
            placeholderTextColor={'#fff'}
            maxLength={50}
            selectionColor={'white'}
            returnKeyType={'done'}
            onChangeText={(text) => this.checkLineBreaks(text)}
            />
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: height - 30,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputWrapper: {

  },
  captionInput: {
    padding: 6,
    color: 'white',
    backgroundColor: '#ff0055',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500'
  },
});


module.exports = CaptionInput;
