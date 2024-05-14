import React, { Component } from "react";
import classnames from "classnames";
import { getUser, createUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UpdateUser extends Component {
  // set state
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
      password: "",
      role: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, username, fullName, password, role } = nextProps.user;

    this.setState({
      id,
      username,
      fullName,
      password,
      role,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateUser = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.createUser(updateUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update User</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="User ID"
                    name="id"
                    value={this.state.id}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.role,
                    })}
                    placeholder="Role"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                  />
                  {errors.role && (
                    <div className="invalid-feedback">{errors.role}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUser, createUser })(UpdateUser);
