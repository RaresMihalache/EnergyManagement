import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingAuth extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    return (
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Online Energy Platform</h1>
                <p className="lead">Monitor your own devices</p>
                <hr />
                <Link
                  className="btn btn-lg btn-secondary mr-2"
                  to="/logout"
                  onClick={this.logout.bind(this)}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingAuth;
