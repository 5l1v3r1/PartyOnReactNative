
'use strict';

const loginActions = require('./LoginActions');
const navigationActions = require('./NavigationActions');
const locationActions = require('./LocationActions');
const partyActions = require('./PartyActions');
const createEventActions = require('./CreateEventActions');
const friendsActions = require('./FriendsActions');
const filterActions = require('./FilterActions');
const notificationActions = require('./NotificationActions');
const shoutoutActions = require('./ShoutoutActions');
const chatActions = require('./ChatActions');
const userActions = require('./UserActions');
const permissionActions = require('./PermissionActions');

module.exports = {
  ...loginActions,
  ...navigationActions,
  ...userActions,
  ...locationActions,
  ...partyActions,
  ...permissionActions,
  ...createEventActions,
  ...friendsActions,
  ...filterActions,
  ...notificationActions,
  ...shoutoutActions,
  ...chatActions
};
