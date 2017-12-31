import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import { isLoggedIn } from '../../utils/misc';

import styles from './Base.css';

const Base = (props) => {
  const data = props.data || {};

  return (
    <Layout className={styles.mainLayout}>
      <Layout>
        <Layout.Content className={styles.contents}>
          {props.children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

Base.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object,
  user: PropTypes.object,
};

export default Base;
