import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'antd';

import Timeline from '../../components/Timeline/Timeline';
import styles from './Track.css';

class Track extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <div className="">

        {/* timeline */}
        <div className={styles.timeline}>
          <Timeline />
        </div>

        {/* track button */}
        <div className={styles.trackButton}>
          <Button type="primary" shape="circle" icon="plus" size="large" />
        </div>
      </div>
    );
  }
}

Track.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  //authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  //actions: bindActionCreators(..., dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Track);
