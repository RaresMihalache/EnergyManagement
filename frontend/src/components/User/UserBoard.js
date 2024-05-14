import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, getDevices } from "../../actions/userActions";
import PropTypes from "prop-types";
import { GET_ERRORS } from "../../actions/types";
import { Link } from "react-router-dom";
import UserBoardItem from "./UseBoardItem";

class UserBoard extends Component {
  //   // constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDevices(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { devices_list } = this.props;
    const { device, devices } = devices_list;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, devices) => {
      if (devices.length < 1 || devices.length == undefined) {
        if (errors.userId) {
          return (
            <div className="alert alert-danger text-center">
              {errors.userId}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center">
              No device associated with this user.
            </div>
          );
        }
      } else {
        return <UserBoardItem items={devices} />;
        // return <h1>tare</h1>;
      }
    };

    BoardContent = boardAlgorithm(errors, devices);

    return <div className="container">{BoardContent} </div>;
  }
}

UserBoard.propTypes = {
  user: PropTypes.object.isRequired,
  getDevices: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  devices_list: state.device,
  errors: state.errors,
});

export default connect(mapStateToProps, { getDevices })(UserBoard);
