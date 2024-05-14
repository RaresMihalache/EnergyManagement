import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteConsumption } from "../../../actions/backlogActions";

class Consumption extends Component {
  onDeleteClick = (backlog_id, consumption_id) => {
    console.log(backlog_id);
    console.log(consumption_id);
    this.props.deleteConsumption(backlog_id, consumption_id);
  };

  render() {
    const { consumption } = this.props;
    // const { backlog } = this.props;
    // const backlog_id = this.props.match.params.id;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary text-center">
          <h4>{consumption.date}</h4>
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title text-center">
            {consumption.startHour}:00 - {consumption.endHour}:00
          </h5>
          <p className="card-text text-center ">
            Energy Consumption: {consumption.consumptionValue} kWh
          </p>
          <a href="" className="btn btn-primary btn-block">
            View / Update
          </a>

          <button
            className="btn btn-danger btn-block"
            onClick={this.onDeleteClick.bind(
              this,
              consumption.backlog_id,
              consumption.id
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Consumption.propTypes = {
  deleteConsumption: PropTypes.func.isRequired,
};

export default connect(null, { deleteConsumption })(Consumption);
