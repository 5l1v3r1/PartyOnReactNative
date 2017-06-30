const strings = require('../../strings/strings');
module.exports = {
  WEEKDAYS: [
    strings.sun, strings.mon, strings.tue, strings.wed, strings.thu, strings.fri, strings.sat
  ],
  MONTHS: [
    strings.jan, strings.feb, strings.mar, strings.apr, strings.may, strings.jun,
    strings.jul, strings.aug, strings.sep, strings.oct, strings.nov, strings.dec
  ],
  MAX_ROWS: 7,
  MAX_COLUMNS: 7,
  getDaysInMonth: function(month, year) {
    var lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  },
};
