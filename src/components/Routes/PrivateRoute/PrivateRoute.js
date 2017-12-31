// Absolute imports
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'dva/router';

// Components
import Base from '../../Base/Base';
import { isLoggedIn } from '../../../utils/misc';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Base {...rest} user={user}>
    <Route
      {...rest}
      render={props => (isLoggedIn(user) ?
        <Component {...rest} {...props} /> :
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  </Base>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  user: PropTypes.object,
};

export default PrivateRoute;
