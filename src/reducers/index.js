var { combineReducers } = require('redux');

module.exports = combineReducers({
  user: require('./UserReducer'),
  navigation: require('./NavigationReducer'),
  location: require('./LocationReducer'),
  party: require('./PartyReducer'),
  event: require('./EventReducer'),
  filter: require('./FilterReducer'),
  notifications: require('./NotificationReducer'),
  shoutouts: require('./ShoutoutReducer'),
  chats: require('./ChatReducer')
});
