var StyleSheet = require('react-native').StyleSheet;

var styles = StyleSheet.create({
  calendar: {
    marginTop: 10
  },
  dayWrapper: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  dayButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  dayLabel: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },

  dayLabelsWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderColor: 'rgba(0,0,0,0.2)'
  },

  daysWrapper: {
    alignSelf: 'center',
  },

  dayLabels: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '200',
    color: '#797979'
  },

  monthLabel: {
    fontSize: 24,
    padding: 5,
    color: '#9B9B9B',
    fontWeight: 'bold',
  },

  yearLabel: {
    fontSize: 24,
    padding: 5,
    color: '#9B9B9B',
    fontWeight: '200',
  },

  monthYearWrapper: {
    flexDirection: 'row'
  },

  prevButton: {
    marginLeft: 40
  },

  nextButton: {
    marginRight: 40
  },

  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#EFEFF4'
  },

  prevMonthSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  nextMonthSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  prev: {
    textAlign: 'left'
  },

  next: {
    textAlign: 'right'
  },

  weeks: {
    flexDirection: 'column'
  },

  weekRow: {
    flexDirection: 'row'
  }
});

module.exports = styles;
