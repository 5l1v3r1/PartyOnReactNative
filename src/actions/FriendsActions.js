

function setFriendsAction(friends) {
  return {
    type: 'SET_FRIENDS',
    friends: friends
  }
}

module.exports = {
  setFriendsAction
}
