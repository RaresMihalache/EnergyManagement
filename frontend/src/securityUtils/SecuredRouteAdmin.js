import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRouteAdmin = ({
  role: role,
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      security.validToken === true && role === "ROLE_ADMIN" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

SecuredRouteAdmin.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, null)(SecuredRouteAdmin);
