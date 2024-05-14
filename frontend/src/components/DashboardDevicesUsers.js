import React, { Component } from "react";
import CreateDeviceButton from "./Device/CreateDeviceButton";
import DeviceItem from "./Device/DeviceItem";
import { connect } from "react-redux";
import { getDevicesUsers } from "../actions/deviceActions";
import PropTypes from "prop-types";
import DeviceItemUsers from "./Device/DeviceItemUsers";

class DashboardDevices extends Component {
  componentDidMount() {
    this.props.getDevicesUsers();
  }

  render() {
    const { devices } = this.props.device;

    return (
      <div className="devices">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Devices</h1>
              <hr />
              {devices.map((device) => (
                <DeviceItemUsers key={device.id} device={device} />
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
  getDevicesUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  device: state.device,
});

export default connect(mapStateToProps, { getDevicesUsers })(DashboardDevices);
