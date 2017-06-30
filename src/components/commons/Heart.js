import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

var Art = require('ReactNativeART');

var HEART_SVG = "M130.4-0.8c25.4 0 46 20.6 46 46.1 0 13.1-5.5 24.9-14.2 33.3L88 153.6 12.5 77.3c-7.9-8.3-12.8-19.6-12.8-31.9 0-25.5 20.6-46.1 46-46.2 19.1 0 35.5 11.7 42.4 28.4C94.9 11 111.3-0.8 130.4-0.8"
var HEART_COLOR = 'rgb(255,0,85,1)';
var GRAY_HEART_COLOR = "rgb(155,155,155,1)";

var FILL_COLORS = [
  'rgba(255,70,136,1)',
  'rgba(255,106,191,1)',
  'rgba(255, 0, 85, 1)',
  'rgba(255, 0, 85, 1)',
  'rgba(255, 0, 85, 1)',
  'rgba(0,0,0,0)'
];

var PARTICLE_COLORS = [
  'rgba(52, 152, 219, 1)',
  'rgba(46, 204, 113, 1)',
  'rgba(241, 196, 15, 1)',
  'rgba(155, 89, 182, 1)',
  'rgba(255, 0, 115, 1)',
  'rgba(255, 0, 150, 1)'
]

function getXYParticle(total, i, radius) {
  var angle = ( (2*Math.PI) / total ) * i;

  var x = Math.round((radius*2) * Math.cos(angle - (Math.PI/2)));
  var y = Math.round((radius*2) * Math.sin(angle - (Math.PI/2)));
  return {
    x: x,
    y: y
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var {
  Surface,
  Group,
  Shape,
  Path,
  Rect
} = Art;

var AnimatedShape = Animated.createAnimatedComponent(Shape);

var ExplodingHeart = React.createClass({

  getInitialState() {
    let animation;
    if (this.props.liked) {
      animation = new Animated.Value(28);
    } else {
      animation = new Animated.Value(0);
    }
    return {
      animation: animation
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.liked !== this.props.liked) {
      if (nextProps.liked) {

      } else {
        this.state.animation.setValue(0);
      }
    }
  },

  explode() {
    if (this.props.liked) {
      this.state.animation.setValue(0);
      // this.setState({
      //   liked: false
      // });
      this.props.onLikePress(false);
    } else {
      this.props.onLikePress(true);
      Animated.timing(this.state.animation, {
        duration: 1500,
        toValue: 28
      }).start(() => {
        // this.setState({
        //   liked: true
        // });
        this.state.animation.setValue(28);
        //this.forceUpdate();
      });
    }
  },

  getSmallExplosions(radius, offset) {
    return [0,1,2,3,4,5,6].map((v, i, t) => {

      var scaleOut = this.state.animation.interpolate({
        inputRange: [0, 5.99, 6, 13.99, 14, 21],
        outputRange: [0, 0, 1, 1, 1, 0],
        extrapolate: 'clamp'
      });

      var moveUp = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, -15],
        extrapolate: 'clamp'
      });

      var moveDown = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, 15],
        extrapolate: 'clamp'
      });

      var color_top_particle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      var color_bottom_particle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      var position = getXYParticle(7, i, radius)

      return (
        <Group
          x={position.x + offset.x }
          y={position.y + offset.y}
          rotation={getRandomInt(70, 75) * i}
        >
          <AnimatedCircle
            x={moveUp}
            y={moveUp}
            radius={25}
            small={true}
            scale={scaleOut}
            fill={color_top_particle}
          />
          <AnimatedCircle
            x={moveDown}
            y={moveDown}
            radius={25}
            small={true}
            scale={scaleOut}
            fill={color_bottom_particle}
          />
        </Group>
      )
    }, this)
  },
  render: function() {

    var heart_scale = this.state.animation.interpolate({
      inputRange: [0, .01, 6, 10, 12, 18, 28],
      outputRange: [1, 0, .1, 1, 1.2, 1, 1],
      extrapolate: 'clamp'
    });

    var heart_fill = this.state.animation.interpolate({
      inputRange: [0, 2],
      outputRange: [GRAY_HEART_COLOR, HEART_COLOR],
      extrapolate: 'clamp'
    })

    var heart_x = heart_scale.interpolate({
      inputRange: [0, 1],
      outputRange: [90, 0],
    })

    var heart_y = heart_scale.interpolate({
      inputRange: [0, 1],
      outputRange: [75, 0],
    })

    var circle_scale = this.state.animation.interpolate({
      inputRange: [0, 1, 4],
      outputRange: [0, .3, 1],
      extrapolate: 'clamp'
    });

    var circle_stroke_width = this.state.animation.interpolate({
      inputRange: [0, 5.99, 6, 7, 10],
      outputRange: [0, 0, 15, 8, 0],
      extrapolate: 'clamp'
    });

    var circle_fill_colors = this.state.animation.interpolate({
      inputRange: [1, 2, 3, 4, 4.99, 5],
      outputRange: FILL_COLORS,
      extrapolate: 'clamp'
    })

    var circle_opacity = this.state.animation.interpolate({
      inputRange: [1,9.99, 10],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })


    return (
        <TouchableWithoutFeedback
          onPress={this.explode}
          style={styles.container}
          >
          <View style={styles.surfaceWrapper}>
              <Surface width={35} height={40}>
              <Group
                x={9}
                y={12}
                scale={.1}
                >
                <AnimatedShape
                  d={HEART_SVG}
                  x={heart_x}
                  y={heart_y}
                  scale={heart_scale}
                  fill={heart_fill}
                />
                <AnimatedCircle
                  x={89}
                  y={75}
                  radius={150}
                  scale={circle_scale}
                  strokeWidth={circle_stroke_width}
                  stroke={FILL_COLORS[2]}
                  fill={circle_fill_colors}
                  opacity={circle_opacity}
                />
                {this.getSmallExplosions(75, {x:89, y:75})}
              </Group>
            </Surface>
          </View>
        </TouchableWithoutFeedback>
    );
  }
});

var AnimatedCircle = React.createClass({displayName: "Circle",
  render: function() {
    var radius = this.props.radius;
    var path;
    if (this.props.small) {
      path = "M5 5 H 45 V 25 H 5 L 5 5";
    } else {
      path = Path().moveTo(0, -radius)
          .arc(0, radius * 2 , radius)
          .arc(0, radius * -2, radius)
          .close();
    }

    return React.createElement(AnimatedShape, React.__spread({},  this.props, {d: path}));
    //return React.createElement(AnimatedShape, ...this.props, {d: path});
  }
});

var styles = StyleSheet.create({
  container: {

  },
});



module.exports = ExplodingHeart;
