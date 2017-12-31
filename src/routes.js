import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, withRouter, Redirect } from 'dva/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Views
import Landing from './routes/Landing/Landing';
import Track from './routes/Track/Track';

// Components
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute/PublicRoute';

class Routes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = ({
    })
  }

  render() {
    return (
      <Switch>

        {/* Home */}

        <PublicRoute
          exact
          path="/"
          user={this.props.user}
          userRedirectPath="/track"
          component={Landing}
          data={{
            path: this.props.location.pathname,
          }}
        />

        <PrivateRoute
          exact
          path="/track"
          user={this.props.user}
          component={Track}
          data={{
            path: this.props.location.pathname,
          }}
        />

      </Switch>
    );
  }
}

Routes.PropTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes));
