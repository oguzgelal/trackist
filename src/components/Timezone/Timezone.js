import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Timezone.css';
import { parseTimezoneName, findPercentLocation } from '../../utils/misc';
import { TIMELINE_SETTINGS } from '../../config/settings';
import Notch from '../Notch/Notch';

class Timezone extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  getMomentInstance(u) {
    const unix = u || moment().unix();
    return moment.unix(unix).tz(this.props.code);
  }

  calculateNowlineLocation() {
    const { timelineStart, timelineEnd, now } = this.props;
    return findPercentLocation(timelineStart, timelineEnd, now);
  }

  renderNotch(notchHandle, labelFormat, type) {
    const { timelineStart, timelineEnd } = this.props;
    const m = this.getMomentInstance(timelineStart);
    m.startOf(notchHandle);

    const res = [];

    while (true) {
      const loc = findPercentLocation(timelineStart, timelineEnd, m.unix());

      let name;
      if (labelFormat) {
        if (typeof labelFormat === 'string') {
          name = m.format(labelFormat);
        } else if (typeof labelFormat === 'function') {
          name = labelFormat(m);
        }
      }

      if (loc > -5 && loc < 110) {
        res.push(
          <Notch
            key={`k-${Math.random()}-${this.props.code}-${loc}`}
            type={type}
            label={name}
            position={loc}
          />,
        );
      }

      if (loc > 110) {
        break;
      }

      m.add(1, `${notchHandle}s`);
    }

    return res;
  }

  renderNotches() {
    const { adjustBy } = this.props;
    const settings = TIMELINE_SETTINGS[adjustBy];
    if (!settings) { return null; }

    const { mainHandle, mainLabelFormat, subHandle, subLabelFormat } = settings;
    let notches = [];

    if (mainHandle) {
      const mainNotches = this.renderNotch(mainHandle, mainLabelFormat, 'large');
      notches = notches.concat(mainNotches);
    }

    if (subHandle) {
      const subNotches = this.renderNotch(subHandle, subLabelFormat, 'small');
      notches = notches.concat(subNotches);
    }

    return notches;
  }

  renderNowText() {
    const { adjustBy } = this.props;
    const settings = TIMELINE_SETTINGS[adjustBy];
    if (!settings || !settings.nowLabel) { return null; }

    const m = this.getMomentInstance();
    if (typeof settings.nowLabel === 'string') {
      return m.format(settings.nowLabel);
    } else if (typeof settings.nowLabel === 'function') {
      return settings.nowLabel(m);
    }
  }

  render() {
    const notches = this.renderNotches();
    const nowLocation = this.calculateNowlineLocation();
    const nowText = this.renderNowText();

    return (
      <div
        className={cx(
          styles.timezone,
          { [styles.timezoneCurrent]: this.props.current },
        )}
      >

        {/* timezone label */}
        <div
          className={cx(
            styles.timezoneLabel,
            { [styles.timezoneLabelCurrent]: this.props.current },
          )}
        >
          {parseTimezoneName(this.props.code, 'display')}
        </div>

        {/* now line */}
        <div className={styles.timezoneNowline} style={{ left: `${nowLocation}%` }}>
          <div
            className={cx(
              styles.timezoneNowlineText,
              { [styles.timezoneNowlineTextLeft]: (nowLocation > 3) },
            )}
          >
            {nowText}
          </div>
        </div>

        {/* notches */}
        {notches}
      </div>
    );
  }
}

Timezone.propTypes = {
  code: PropTypes.string.isRequired,
  current: PropTypes.bool,
  now: PropTypes.number,
  timelineStart: PropTypes.number,
  timelineEnd: PropTypes.number,
  adjustBy: PropTypes.string,
};

export default Timezone;
