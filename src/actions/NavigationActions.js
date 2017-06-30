function switchTab(tab) {
  return {
    type: 'SWITCH_TAB',
    tab: tab,
  }
}

function switchToggle() {
  return {
    type: 'SWITCH_TOGGLE'
  }
}

function toggleBarStyle() {
  return {
    type: 'TOGGLE_BARSTYLE'
  }
}

module.exports = {switchTab, switchToggle, toggleBarStyle};
