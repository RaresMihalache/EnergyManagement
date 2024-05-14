import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getConsumptionsByDeviceAndDate } from "../../../actions/userActions";
import { getDeviceUser } from "../../../actions/deviceActions";
import PropTypes from "prop-types";

class ConsumptionGraphForm extends Component {
  constructor() {
    super();
    // const { device_id } = this.props.match.params;

    this.state = {
      device: {},
      date: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { device } = nextProps;

    this.setState({
      device,
    });
  }

  componentDidMount() {
    const { device_id } = this.props.match.params;
    this.state.device = this.props.getDeviceUser(device_id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { device_id } = this.props.match.params;

    const updateConsumptions = {
      device: this.state.device,
      date: this.state.date,
    };

    // console.log(updateConsumptions.device);
    // console.log(updateConsumptions.date);

    const res = this.props.getConsumptionsByDeviceAndDate(
      device_id,
      updateConsumptions.date,
      this.props.history.push(
        `/deviceBoard/consumption/${device_id}/${updateConsumptions.date}`
      )
    );
    console.log(res);
    // <Redirect to="/login" />;
  }

  render() {
    // const { device_id } = this.props.match.params;
    // const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>Please select a date</h3>
              </div>
            </div>
          </div>
        </div>
        <form className="mt-4" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              name="date"
              value={this.state.date}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </div>
        </form>
      </div>
    );
  }
}

ConsumptionGraphForm.propTypes = {
  getDevice: PropTypes.func.isRequired,
  getConsumptionsByDeviceAndDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  date: state.date,
  device: state.device,
});

export default connect(mapStateToProps, {
  getConsumptionsByDeviceAndDate,
  getDeviceUser,
})(ConsumptionGraphForm);
