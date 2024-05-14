import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/userActions";
import PropTypes from "prop-types";
import CreateUserButton from "./User/CreateUserButton";
import UserItem from "./User/UserItem";

class DashboardUsers extends Component {
  componentDidMount() {
    this.props.getUsers();
    // this.props.getDevices();
  }

  render() {
    console.log(this.props);
    const { users } = this.props.user;
    // const { devices } = this.props.user.devices;

    return (
      <div className="users">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Users</h1>
              <br />
              <CreateUserButton />
              <br />
              <hr />
              {users.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  // getDevices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(DashboardUsers);
