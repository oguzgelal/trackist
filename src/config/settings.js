export default {
  TIMELINE_TIMEZONE_DEFAULT_HEIGHT: 40,
  TIMELINE_TIMEZONE_REDUCE_BY_TIMEZONE: 20,
  TIMELINE_SETTINGS: {
    minute: {
      nowLabel: 's',
      mainHandle: null,
      mainLabelFormat: null,
      subHandle: 'second',
      subLabelFormat: (m) => {
        const val = m.format('s');
        const num = parseInt(val, 10);
        if (num % 5 === 0) { return val; }
        return null;
      },
    },
    hour: {
      nowLabel: 'h:ma',
      mainHandle: 'hour',
      mainLabelFormat: 'ha',
      subHandle: 'minute',
      subLabelFormat: (m) => {
        const val = m.format('m');
        const num = parseInt(val, 10);
        if (num % 5 === 0 && val !== '0') { return val; }
        return null;
      },
    },
    day: {
      nowLabel: 'h:ma',
      mainHandle: 'day',
      mainLabelFormat: 'ddd',
      subHandle: 'hour',
      subLabelFormat: (m) => {
        const v = parseInt(m.format('h'), 10);
        if (v % 3 !== 0) { return null; }
        const val = m.format('ha');
        if (val === '12am' || val === '0') { return null; }
        return val;
      },
    },
    week: {
      nowLabel: 'ddd, Do',
      mainHandle: 'day',
      mainLabelFormat: (m) => {
        const val = m.format('ddd (Do)');
        const s = val.split(' ');
        if (s[0] !== 'Mon') { return s[0]; }
        return val;
      },
      subHandle: null,
      subLabelFormat: null,
    },
    month: {
      nowLabel: 'ddd, Do',
      mainHandle: 'month',
      mainLabelFormat: 'MMMM',
      subHandle: 'day',
      subLabelFormat: (m) => {
        const dateNum = m.format('D');
        if (dateNum > 2 && dateNum < 31 && dateNum % 5 === 0) {
          return m.format('Do');
        }
      },
    },
  },
};

