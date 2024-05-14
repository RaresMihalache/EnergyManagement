import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRouteUser = ({
  role: role,
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      security.validToken === true && role == "ROLE_USER" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

SecuredRouteUser.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, null)(SecuredRouteUser);
