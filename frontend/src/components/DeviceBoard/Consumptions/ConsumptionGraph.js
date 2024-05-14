import React, { Component } from "react";
import { connect } from "react-redux";
import { getConsumptionsByDeviceAndDate } from "../../../actions/userActions";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
// import LineChart from "../../Charts/LineChart";

class ConsumptionGraph extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        datasets: [],
        labels: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },
      consumptions: {},
      consumptionsSize: {},
    };
  }

  getValueOfLabel = (label) => {
    // console.log(this.state);
    if (typeof this.state === "undefined") return 0;

    // const ok = 0;
    // console.log(this.state.consumptions);
    // console.log(typeof this.state.consumptions);

    // console.log(this.state.consumptions);
    // console.log(this.state.data);
    // console.log(this.state.consumptions);

    for (let index = 0; index < this.state.consumptionsSize; index++) {
      console.log(this.state.consumptions[index.toString()].startHour);
      if (
        this.state.consumptions[index.toString()].startHour == label ||
        this.state.consumptions[index.toString()].endHour == label
      ) {
        return this.state.consumptions[index.toString()].consumptionValue;
        // return 2.4;
      }
    }

    // console.log(this.state.consumptions);
    // for (const consumption in this.state.consumptions) {
    // console.log(consumption);
    // for (let index = 0; index < this.state.consumptionsSize; index++) {
    // let startHour = consumption[index.toString()].startHour;
    // console.log(startHour);
    // console.log(consumption[index]);
    // }
    // console.log(typeof consump tion);
    // console.log(label + consumption);
    // if (consumption.startHour == label || consumption.endHour == label) {
    // return consumption.consumptionValue;
    // }
    // }
    return 0;
  };

  componentDidMount() {
    const { device_id } = this.props.match.params;
    const { date } = this.props.match.params;
    this.state.consumptions = this.props.getConsumptionsByDeviceAndDate(
      device_id,
      date,
      this.props.history
    );
  }

  componentWillReceiveProps(nextProps) {
    const { consumptions } = nextProps;

    this.setState({
      consumptions: consumptions,
      consumptionsSize: consumptions.length,
    });
    // console.log(consumptions);
    console.log(consumptions.length);
    this.state.data.datasets[0] = consumptions;
    this.state.data.datasets[0].label = "kWh";

    this.state.data.datasets[0].data = this.state.data.labels.map((label) =>
      this.getValueOfLabel(label)
    );
    (this.state.data.datasets[0].borderColor = "rgb(255, 99, 132)"),
      (this.state.data.datasets[0].backgroundColor = "rgba(255, 99, 132, 0.5)");

    // console.log(this.state.data);
  }

  render() {
    const labels = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24,
    ];
    // console.log(this.state.data);
    // console.log("abc");
    // console.log(this.state.consumptions);
    return (
      <div>
        <Line data={this.state.data} />
      </div>
    );
  }
}

ConsumptionGraph.propTypes = {
  getConsumptionByDeviceAndDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  device: state.device,
  consumptions: state.device.consumptions,
});

export default connect(mapStateToProps, { getConsumptionsByDeviceAndDate })(
  ConsumptionGraph
);
