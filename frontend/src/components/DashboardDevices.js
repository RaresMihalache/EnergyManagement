import React, { Component } from "react";
import CreateDeviceButton from "./Device/CreateDeviceButton";
import DeviceItem from "./Device/DeviceItem";
import { connect } from "react-redux";
import { getDevices } from "../actions/deviceActions";
import PropTypes from "prop-types";

class DashboardDevices extends Component {
  componentDidMount() {
    this.props.getDevices();
  }

  render() {
    const { devices } = this.props.device;

    return (
      <div className="devices">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Devices</h1>
              <br />
              <CreateDeviceButton />
              <br />
              <hr />
              {devices.map((device) => (
                <DeviceItem key={device.id} device={device} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardDevices.propTypes = {
  device: PropTypes.object.isRequired,
  getDevices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  device: state.device,
});

export default connect(mapStateToProps, { getDevices })(DashboardDevices);
