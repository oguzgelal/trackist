import React from 'react';
import PropTypes from 'prop-types';

import styles from './Timezone.css';
import { parseTimezoneName } from '../../../utils/misc';

class Timezone extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.timezone}>

        {/* timezone label */}
        <div className={styles.timezoneLabel}>
          {parseTimezoneName(this.props.code, 'display')}
        </div>

        {/* timezone midpoint */}
        <div className={styles.timezoneMidpoint}></div>
      </div>
    );
  }
}

Timezone.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Timezone;
