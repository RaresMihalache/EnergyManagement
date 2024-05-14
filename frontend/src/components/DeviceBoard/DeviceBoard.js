import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class DeviceBoard extends Component {
  // constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { consumptions } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, consumptions) => {
      if (consumptions.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center">
              {errors.projectNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center">
              No project tasks on this board.
            </div>
          );
        }
      } else {
        return <Backlog consumptions={consumptions} />;
      }
    };

    BoardContent = boardAlgorithm(errors, consumptions);

    return (
      <div className="container">
        <Link to={`/addConsumption/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Consumption</i>
        </Link>
        <br />
        <hr />
        {BoardContent}{" "}
      </div>
    );
  }
}

DeviceBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(DeviceBoard);
