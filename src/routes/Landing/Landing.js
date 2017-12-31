import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './Landing.css';

class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

      userNameSettings: {
        rules: [
          {
            required: true,
            message: 'Please input your username!'
          },
        ],
      },

      passwordSettings: {
        rules: [
          {
            required: true,
            message: 'Please input your Password!'
          },
        ],
      },

    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const userNameItem = (
      <Input
        placeholder="Username"
        prefix={
          <Icon type="user" className={styles.icon} />
        }
      />
    );

    const passwordItem = (
      <Input
        type="password"
        placeholder="Password"
        prefix={
          <Icon type="lock" className={styles.icon} />
        }
      />
    );

    return (
      <div className={styles.page}>

        {/* form wrapper */}
        <div className={styles.formWrapper}>

          {/* header */}
          <div className={styles.header}>Trackist</div>

          {/* form */}
          <div className="">
            <Form onSubmit={this.handleSubmit} className={styles.loginForm}>

              {/* username field */}
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('userName', this.state.userNameSettings)(userNameItem)}
              </Form.Item>

              {/* password field */}
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('password', this.state.passwordSettings)(passwordItem)}
              </Form.Item>

              {/* actions */}
              <Form.Item className={styles.formItem}>

                {/* login button */}
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}>Log in</Button>

                {/* other actions */}
                <div className={styles.formFooter}>

                  {/* forgot password */}
                  <div className={styles.formFooterLeft}>
                    <a href="">Forgot password</a>
                  </div>

                  {/* register */}
                  <div className={styles.formFooterRight}>
                    <a href="">Register now!</a>
                  </div>

                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  //authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  //actions: bindActionCreators(..., dispatch)
});

const LandingWithForm = Form.create()(Landing);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingWithForm);
