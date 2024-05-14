import React, { Component } from "react";

class DeviceItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary text-center">
          <h3>Id: {item.id}</h3>
        </div>
        <div className="card-body bg-light">
          <h4 className="card-text text-center">
            Max Consumption:{item.maxConsumptionHourly} kWh
          </h4>
          <h5 className="card-title text-center">Address: {item.address}</h5>
          <p className="card-text text-center ">
            Description: {item.description}
          </p>
        </div>
      </div>
      // <h1>{item.id}</h1>
    );
  }
}

export default DeviceItem;
