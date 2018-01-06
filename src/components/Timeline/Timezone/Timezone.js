import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Timezone.css';
import { parseTimezoneName, findPercentLocation } from '../../../utils/misc';
import { TIMELINE_NOTCH_SETTINGS } from '../../../config/settings';
import Notch from '../Notch/Notch';

class Timezone extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  getMomentInstance() {
    return moment().tz(this.props.code).clone();
  }

  calculateNowlineLocation() {
    return findPercentLocation(this.props.timelineStart, this.props.timelineEnd, this.props.now);
  }

  renderNotch(i, notchHandle, labelFormat, labelFilter, type) {
    const { timelineStart, timelineEnd } = this.props;
    const res = [];
    const oBefore = this.getMomentInstance().subtract(i, `${notchHandle}s`).startOf(notchHandle);
    const oAfter = this.getMomentInstance().add(i, `${notchHandle}s`).startOf(notchHandle);
    const locBefore = findPercentLocation(timelineStart, timelineEnd, oBefore.unix());
    const locAfter = findPercentLocation(timelineStart, timelineEnd, oAfter.unix());
    const keyBefore = `sb-${Math.random()}-${this.props.code}-${locBefore}`;
    const keyAfter = `sa-${Math.random()}-${this.props.code}-${locAfter}`;
    let nameBefore; let nameAfter;
    if (labelFormat) {
      if (typeof labelFormat === 'string') {
        nameBefore = oBefore.format(labelFormat);
        nameAfter = oAfter.format(labelFormat);
      } else if (typeof labelFormat === 'function') {
        nameBefore = labelFormat(oBefore);
        nameAfter = labelFormat(oAfter);
      }
    }

    if (locBefore >= -5) {
      res.push(
        <Notch type={type} label={nameBefore} position={locBefore} key={keyBefore} />,
      );
    }

    if (locAfter <= 105) {
      res.push(
        <Notch type={type} label={nameAfter} position={locAfter} key={keyAfter} />,
      );
    }

    return res;
  }

  renderNotches() {
    const { adjustBy } = this.props;
    const settings = TIMELINE_NOTCH_SETTINGS[adjustBy];
    if (!settings) { return null; }

    const {
      mainHandle,
      mainNotch,
      mainLabelFormat,
      mainLabelFilter,
      subHandle,
      subNotch,
      subLabelFormat,
      subLabelFilter,
    } = settings;

    let notches = [];
    const loopLimit = 200;

    if (mainNotch) {
      for (let i = 0; i < loopLimit; i += 1) {
        const res = this.renderNotch(i, mainHandle, mainLabelFormat, mainLabelFilter, 'large');
        if (!res || res.length === 0) { break; }
        notches = notches.concat(res);
      }
    }

    if (subNotch) {
      for (let i = 0; i < loopLimit; i += 1) {
        const res = this.renderNotch(i, subHandle, subLabelFormat, subLabelFilter, 'small');
        if (!res || res.length === 0) { break; }
        notches = notches.concat(res);
      }
    }

    return notches;
  }

  render() {
    const notches = this.renderNotches();

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
        <div
          className={styles.timezoneNowline}
          style={{ left: `${this.calculateNowlineLocation()}%` }}
        />

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
