import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, token } = this.props.security;

    const userIsAuthenticatedUserRole = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/myDevices">
              Devices
            </Link>
          </li>
          <li className="Logs">
            <Link className="nav-link" to="topic/events">
              Logs
            </Link>
          </li>
          <li className="Chat">
            <Link className="nav-link" to="chat">
              Chat
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home-user">
              <i className="fas fa-user-circle mr-1" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAuthenticatedAdminRole = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard-users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard-devices">
              Devices
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addMapping">
              Mappings
            </Link>
          </li>
          <li className="Logs">
            <Link className="nav-link" to="topic/events">
              Logs
            </Link>
          </li>
          <li className="Chat">
            <Link className="nav-link" to="chat">
              Chat
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home-admin">
              <i className="fas fa-user-circle mr-1" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken) {
      const role = JSON.parse(atob(token.split(".")[1]))["scope"].toString();
      if (role === "ROLE_ADMIN") {
        headerLinks = userIsAuthenticatedAdminRole;
      } else if (role === "ROLE_USER") {
        headerLinks = userIsAuthenticatedUserRole;
      }
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Online Energy Platform
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );

    // return (
    //   <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    //     <div className="container">
    //       <Link className="navbar-brand" to="/">
    //         Online Energy Platform
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#mobile-nav"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>

    //       <div className="collapse navbar-collapse" id="mobile-nav">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item ml-5">
    //             <a className="nav-link" href="/dashboard-devices">
    //               Devices
    //             </a>
    //           </li>
    //           <li className="nav-item ml-5">
    //             <a className="nav-link" href="/dashboard-users">
    //               Users
    //             </a>
    //           </li>
    //           <li className="nav-item ml-5">
    //             <a className="nav-link" href="/dashboard-mapping">
    //               Create Mapping
    //             </a>
    //           </li>
    //         </ul>

    //         <ul className="navbar-nav ml-auto">
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/login">
    //               Login
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
