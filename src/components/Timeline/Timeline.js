import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Popover } from 'antd';

import Timezone from './Timezone/Timezone';
import styles from './Timeline.css';
import { parseTimezoneName } from '../../utils/misc';


class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);

    window.moment = moment;
    window.momentTimezone = momentTimezone;

    this.state = {
      timezones: [
        'Europe/Brussels',
        'EST',
        'America/New_York',
        'America/Los_Angeles',
        'Europe/Istanbul',
      ]
    };
  }

  render() {

    const timezones = [];
    this.state.timezones.map(tz => {
      timezones.push(
        <div className={styles.timezone} key={tz}>
          <Timezone code={tz} />
        </div>
      );
    })

    return (
      <div className={styles.timeline}>

        {/* now */}
        <div className={styles.nowWrapper}>
          <div className={styles.nowLine} />
          <div className={styles.nowTime}>
            {moment().format("HH:mm")}
          </div>
          <div className={styles.nowTimezone}>
            {parseTimezoneName(moment.tz.guess())}
          </div>
        </div>

        {/* timezones */}
        <div className={styles.timezones}>
          {timezones}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
};

export default Timeline;
