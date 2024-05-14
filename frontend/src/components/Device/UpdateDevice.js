import React, { Component } from "react";
import classnames from "classnames";
import { getDevice, createDevice } from "../../actions/deviceActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UpdateDevice extends Component {
  // set state
  constructor() {
    super();

    this.state = {
      id: "",
      description: "",
      address: "",
      maxConsumptionHourly: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, description, address, maxConsumptionHourly } = nextProps.device;

    this.setState({
      id,
      description,
      address,
      maxConsumptionHourly,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDevice(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateDevice = {
      id: this.state.id,
      description: this.state.description,
      address: this.state.address,
      maxConsumptionHourly: this.state.maxConsumptionHourly,
    };

    this.props.createDevice(updateDevice, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Device</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Device ID"
                    name="id"
                    value={this.state.id}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.maxConsumptionHourly,
                    })}
                    placeholder="Max Hourly Consumption"
                    name="maxConsumptionHourly"
                    value={this.state.maxConsumptionHourly}
                    onChange={this.onChange}
                  />
                  {errors.maxConsumptionHourly && (
                    <div className="invalid-feedback">
                      {errors.maxConsumptionHourly}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.address,
                    })}
                    placeholder="Device Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.maxConsumptionHourly && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Device Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.maxConsumptionHourly && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateDevice.propTypes = {
  getDevice: PropTypes.func.isRequired,
  createDevice: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  device: state.device.device,
  errors: state.errors,
});

export default connect(mapStateToProps, { getDevice, createDevice })(
  UpdateDevice
);
