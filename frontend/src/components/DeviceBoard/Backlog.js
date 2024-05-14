import React, { Component } from "react";
import Consumption from "./Consumptions/Consumption";

class Backlog extends Component {
  render() {
    const { consumptions } = this.props;

    const consumption_list = consumptions.map((consumption) => (
      <Consumption key={consumption.key} consumption={consumption} />
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>Consumption List</h3>
              </div>
            </div>
            {
              // insert consumption here
            }
            {consumption_list}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
