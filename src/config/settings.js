export default {
  TIMELINE_TIMEZONE_DEFAULT_HEIGHT: 40,
  TIMELINE_TIMEZONE_REDUCE_BY_TIMEZONE: 20,
  TIMELINE_NOTCH_SETTINGS: {
    minute: {
      mainNotch: false,
      mainHandle: null,
      mainLabelFormat: null,
      mainLabelFilter: null,
      subNotch: true,
      subHandle: 'second',
      subLabelFormat: (m) => {
        const val = m.format('s');
        const num = parseInt(val, 10);
        if (num % 5 === 0) { return val; }
        return null;
      },
    },
    hour: {
      mainNotch: true,
      mainHandle: 'hour',
      mainLabelFormat: 'ha',
      mainLabelFilter: null,
      subNotch: true,
      subHandle: 'minute',
      subLabelFormat: (m) => {
        const val = m.format('m');
        const num = parseInt(val, 10);
        if (num % 15 === 0 && val !== '0') { return val; }
        return null;
      },
    },
    day: {
      mainNotch: true,
      mainHandle: 'day',
      mainLabelFormat: 'ddd',
      mainLabelFilter: null,
      subNotch: true,
      subHandle: 'hour',
      subLabelFormat: (m) => {
        const val = m.format('ha');
        if (val === '12am' || '0') { return null; }
        return val;
      },
    },
    week: {
      mainNotch: true,
      mainHandle: 'day',
      mainLabelFormat: (m) => {
        const val = m.format('ddd (Do)');
        const s = val.split(' ');
        if (s[0] !== 'Mon') { return s[0]; }
        return val;
      },
      subNotch: false,
      subHandle: null,
      subLabelFormat: null,
    },
    month: {
      mainNotch: true,
      mainHandle: 'month',
      mainLabelFormat: 'MMMM',
      subNotch: true,
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

