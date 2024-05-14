import React, { Component } from "react";
import DeviceItem from "./DeviceItem";

class UserBoardItem extends Component {
  render() {
    const { items } = this.props;

    const devices_list = items.map((item) => (
      <DeviceItem key={item.id} item={item} />
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>Devices List</h3>
              </div>
            </div>
            {
              // insert consumption here
            }
            {devices_list}
          </div>
        </div>
      </div>
    );
  }
}

export default UserBoardItem;
