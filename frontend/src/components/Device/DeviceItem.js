import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteDevice } from "../../actions/deviceActions";

class DeviceItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteDevice(id);
  };

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
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/deviceBoard/${device.id}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">Device Board</i>
                  </li>
                </Link>
                <Link to={`/updateDevice/${device.id}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Device Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, device.id)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Device</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeviceItem.propTypes = {
  deleteDevice: PropTypes.func.isRequired,
};

export default connect(null, { deleteDevice })(DeviceItem);
