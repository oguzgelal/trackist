import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Notch.css';

const Notch = (props) => {
  let notchHeight = '5px';
  if (props.type && props.type === 'small') { notchHeight = '2px'; }
  if (props.type && props.type === 'large') { notchHeight = '3px'; }
  if (props.type && props.type === 'full') { notchHeight = '100%'; }

  let transform = 'translateX(-50%)';
  if (props.position < 5) { transform = 'translateX(5%)'; }
  if (props.position > 95) { transform = 'translateX(-105%)'; }

  return (
    <div
      style={{ left: `${props.position}%` }}
      className={cx(
        styles.notch,
      )}
    >

      {/* notch label */}
      <div
        style={{ transform }}
        className={cx(
          styles.notchLabel,
          { [styles.notchLabelSmall]: props.type === 'small' },
        )}
      >
        {props.label}
      </div>

      {/* notch line */}
      <div
        style={{ height: notchHeight }}
        className={cx(
          styles.notchLine,
          { [styles.notchLineSmall]: props.type === 'small' },
        )}
      />
    </div>
  );
};

Notch.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  position: PropTypes.number.isRequired,
};

export default Notch;
