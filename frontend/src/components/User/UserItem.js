import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";

class UserItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteUser(id);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">Role: {user.role}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>Id: {user.id}</h3>
              <p>Full Name: {user.fullName}</p>
              <p>Email: {user.username}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/userBoard/${user.id}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">User Board</i>
                  </li>
                </Link>
                <Link to={`updateUser/${user.id}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update User Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, user.id)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete User</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserItem);
