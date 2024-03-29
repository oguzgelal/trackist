import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Radio } from 'antd';

import settings from '../../config/settings';
import Timezone from '../Timezone/Timezone';
import Track from '../Track/Track';
import styles from './Timeline.css';
import { findPercentLocation } from '../../utils/misc';


class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);

    window.moment = moment;

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
      tracks: [
        {
          id: 1,
          startTime: 1515355200,
          text: 'Working on Track.ist',
        },
      ],
    };

    this.setTimelineAdjust = this.setTimelineAdjust.bind(this);

    this.refreshTimelineStart();
  }

  setTimelineAdjust(e) {
    const s = Object.assign({}, this.state);
    s.adjustBy = e.target.value;
    s.now = moment().unix();
    s.timelineStart = moment().startOf(s.adjustBy).unix();
    s.timelineEnd = moment().endOf(s.adjustBy).unix();
    this.setState(s);
  }

  refreshTimelineStart() {
    setInterval(() => {
      const s = Object.assign({}, this.state);
      s.now = moment().unix();
      if (this.state.adjust) {
        s.timelineStart = moment().startOf(s.adjustBy).unix();
        s.timelineEnd = moment().endOf(s.adjustBy).unix();
      }
      this.setState(s);
    }, 1000);
  }

  render() {
    const timezones = [
      <div className={styles.timezone} key="default-timezone">
        <Timezone
          current
          now={this.state.now}
          timelineStart={this.state.timelineStart}
          timelineEnd={this.state.timelineEnd}
          adjustBy={this.state.adjustBy}
          code={moment.tz.guess()}
        />
      </div>,
    ];
    this.state.timezones.map((tz) => {
      timezones.push(
        <div className={styles.timezone} key={tz}>
          <Timezone
            now={this.state.now}
            timelineStart={this.state.timelineStart}
            timelineEnd={this.state.timelineEnd}
            adjustBy={this.state.adjustBy}
            code={tz}
          />
        </div>,
      );
      return tz;
    });

    const tracks = [];
    this.state.tracks.map((track) => {
      tracks.push(<Track track={track} key={track.id} />);
      return track;
    });

    return (
      <div className={styles.timeline}>

        {/* header */}
        <div className={styles.timelineHeader}>
          <div className={styles.timelineTitle}>Trackist</div>
          <div className={styles.timelineSettings}>
            <Radio.Group size="small" type="primary" value={this.state.adjustBy} onChange={this.setTimelineAdjust}>
              <Radio.Button value="minute">Minute</Radio.Button>
              <Radio.Button value="hour">Hour</Radio.Button>
              <Radio.Button value="day">Day</Radio.Button>
              <Radio.Button value="week">Week</Radio.Button>
              <Radio.Button value="month">Month</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        {/* timezones */}
        <div className={styles.timezones}>
          {timezones}
        </div>

        {/* tracks */}
        <div className={styles.tracks}>
          {tracks}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
};

export default Timeline;
