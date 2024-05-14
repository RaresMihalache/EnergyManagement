import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    const isValidToken = nextProps.security.validToken;
    if (isValidToken) {
      const token = nextProps.security.token;
      const user_role = JSON.parse(atob(token.split(".")[1]))["scope"];
      if (user_role == "ROLE_USER") this.props.history.push("/home-user");
      else if (user_role == "ROLE_ADMIN")
        this.props.history.push("/home-admin");
      alert('Logged in!');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
    // localStorage.setItem("token", login.valoare)
  }

  render() {
    const { errors } = this.state;
    // const token =
    //   "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2Iiwic2NvcGUiOlsiUk9MRV9BRE1JTiJdLCJpc3MiOiJzZWxmIiwiaWQiOjYsImV4cCI6MTY2OTU1MzgxMywiaWF0IjoxNjY5NTUwMjEzfQ.PNTdeLNqDnC6N7yUX91xlTkbwaW6CxbPFQDYfp_vFztwJ7n2d4aVf4Cn9tTstFx-9cFyjuovcusrojn443_XGQpuZ407f8jtIFi57l7eUSELBMnaOBlOv0tgRguQ3pIQxrsJx0Y9WCE4sBAw1NavisKItzv5xq5-AkFOkV10IiFLnqE6CTMuLH2Hd64W6QHKdq45thfDhpmpZilrnnDimYC3PiYvc0usgYuE6LuoCFwV5IVjsDPkrrTGUk4EODtTWzdYcGVhtMGUzRN97_RBib0h40CFueJc3j0N43moXs_acjYMAi2HOEyJOWc22BsblBzGVp2daUbUMdhuOGoPfw";
    // console.log(JSON.parse(atob(token.split(".")[1]))["scope"]);
    // console.log(JSON.parse(atob(token.split(".")[1]))["id"]);

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
