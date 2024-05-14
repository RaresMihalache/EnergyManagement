import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createDevice } from "../../actions/deviceActions";
import classnames from "classnames";

class AddDevice extends Component {
  constructor() {
    super();

    this.state = {
      description: "",
      address: "",
      maxConsumptionHourly: null,
      errors: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // lifecycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newDevice = {
      description: this.state.description,
      address: this.state.address,
      maxConsumptionHourly: this.state.maxConsumptionHourly,
    };

    this.props.createDevice(newDevice, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="device">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Device</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Device ID"
                    disabled
                    name="id"
                    value={this.state.id}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.maxConsumptionHourly,
                    })}
                    placeholder="Max Hourly Consumption"
                    step={"any"}
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
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.address,
                    })}
                    placeholder="Device Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Device Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
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

AddDevice.propTypes = {
  createDevice: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createDevice })(AddDevice);
