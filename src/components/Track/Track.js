import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

import styles from './Track.css';

class Track extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const actions = [];

    actions.push(
      <Icon type="setting" />,
    );

    actions.push(
      <Icon type="edit" />,
    );

    actions.push(
      <Icon type="ellipsis" />,
    );


    return (
      /*
      <Card
        title="Running - 4h 21m"
        className={styles.trackCard}
        style={{ width: 300 }}
        actions={actions}
      >
        <div className={styles.trackContent}>
          {this.props.track.text}
        </div>
      </Card>
      */
      <div />
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
