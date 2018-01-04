import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Popover, Button, Radio } from 'antd';

import settings from '../../config/settings';
import Timezone from './Timezone/Timezone';
import styles from './Timeline.css';
import { parseTimezoneName } from '../../utils/misc';


class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);

    window.moment = moment;
    window.momentTimezone = momentTimezone;

    this.state = {
      adjust: true,
      adjustBy: 'day',
      now: moment().unix(),
      timelineStart: moment().startOf('day').unix(),
      timelineEnd: moment().endOf('day').unix(),
      timezones: [
        'EST',
        'America/New_York',
        'America/Los_Angeles',
        'Europe/Istanbul',
      ],
    };

    this.setTimelineAdjust = this.setTimelineAdjust.bind(this);

    this.refreshTimelineStart();
  }

  refreshTimelineStart() {
    setInterval(() => {
      let s = this.state;
      s.now = moment().unix();
      if (this.state.adjust) {
        s.timelineStart = moment().startOf(s.adjustBy).unix();
        s.timelineEnd = moment().endOf(s.adjustBy).unix();
      }
      this.setState(s);
    }, 1000)
  }

  setTimelineAdjust(e) {
    let s = this.state;
    s.adjustBy = e.target.value;
    s.now = moment().unix();
    s.timelineStart = moment().startOf(s.adjustBy).unix();
    s.timelineEnd = moment().endOf(s.adjustBy).unix();
    this.setState(s)
  }

  calculateTimezoneHeight() {
    return settings.TIMELINE_TIMEZONE_DEFAULT_HEIGHT - (settings.TIMELINE_TIMEZONE_REDUCE_BY_TIMEZONE * this.state.timezones.length);
  }

  calculateNowlineLocation() {
    const { now, timelineStart, timelineEnd } = this.state;
    return (now - timelineStart) / (timelineEnd - timelineStart) * 100;
  }

  render() {

    const timezones = [
      <div className={styles.timezone} key="default-timezone">
        <Timezone
          current
          nowlineLocation={this.calculateNowlineLocation()}
          timelineStart={this.state.timelineStart}
          timelineEnd={this.state.timelineEnd}
          height={this.calculateTimezoneHeight()}
          code={moment.tz.guess()}
        />
      </div>
    ];
    this.state.timezones.map(tz => {
      timezones.push(
        <div className={styles.timezone} key={tz}>
          <Timezone
            timelineStart={this.state.timelineStart}
            timelineEnd={this.state.timelineEnd}
            nowlineLocation={this.calculateNowlineLocation()}
            height={this.calculateTimezoneHeight()}
            code={tz}
          />
        </div>
      );
    })

    return (
      <div className={styles.timeline}>

        <div className={styles.timelineHeader}>
          <div className={styles.timelineTitle}>Trackist</div>
          <div className={styles.timelineSettings}>
            <Radio.Group size="small" type="primary" value={this.state.adjustBy} onChange={this.setTimelineAdjust}>
              <Radio.Button value="minute">Minute</Radio.Button>
              <Radio.Button value="hour">Hour</Radio.Button>
              <Radio.Button value="day">Day</Radio.Button>
              <Radio.Button value="week">Week</Radio.Button>
            </Radio.Group>
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
