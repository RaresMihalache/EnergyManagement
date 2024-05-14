import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DeviceItemUsers extends Component {
  render() {
    const { device } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">
                Max Consumption: {device.maxConsumptionHourly}
              </span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>Id: {device.id}</h3>
              <p>Address: {device.address}</p>
              <p>Description: {device.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block h4">
              <ul className="list-group mt-4">
                <Link to={`/deviceBoard/consumption/${device.id}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-chart-line pr-1"> Consumption Graph</i>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceItemUsers;
