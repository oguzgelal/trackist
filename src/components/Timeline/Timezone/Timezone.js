import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Timezone.css';
import { parseTimezoneName } from '../../../utils/misc';

class Timezone extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const labelClassnames = classNames(
      styles.timezoneLabel,
      { [styles.timezoneLabelCurrent]: this.props.current },
    );

    return (
      <div
        className={styles.timezone}
        style={{ height: `${this.props.height || 35}px` }}
      >

        {/* timezone label */}
        <div className={labelClassnames}>
          {parseTimezoneName(this.props.code, 'display')}
        </div>

        {/* now line */}
        <div
          className={styles.timezoneNowline}
          style={{ left: `calc(${this.props.nowlineLocation}% - 1px)` }}>
        </div>
      </div>
    );
  }
}

Timezone.propTypes = {
  code: PropTypes.string.isRequired,
  current: PropTypes.bool,
  height: PropTypes.number,
  nowlineLocation: PropTypes.number.isRequired,
  timelineStart: PropTypes.number,
  timelineEnd: PropTypes.number,
};

export default Timezone;
