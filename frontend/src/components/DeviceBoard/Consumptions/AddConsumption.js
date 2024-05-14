import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addConsumption } from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class AddConsumption extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      date: "",
      startHour: null,
      endHour: null,
      consumptionValue: null,
      backlog: id,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // on change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // on submit
  onSubmit(e) {
    e.preventDefault();

    const newConsumption = {
      date: this.state.date,
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      consumptionValue: this.state.consumptionValue,
    };

    this.props.addConsumption(
      this.state.backlog,
      newConsumption,
      this.props.history
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/deviceBoard/${id}`} className="btn btn-light">
                Back to Device Board
              </Link>
              <h4 className="display-4 text-center">Add Consumption Item</h4>
              <p className="lead text-center">Consumption Info</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.date,
                    })}
                    name="date"
                    value={this.state.date}
                    onChange={this.onChange}
                  />
                  {errors.date && (
                    <div classnames="invalid-feedback">{errors.date}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.startHour,
                    })}
                    name="startHour"
                    value={this.state.startHour}
                    placeholder="Start Hour"
                    onChange={this.onChange}
                  />
                  {errors.startHour && (
                    <div classnames="invalid-feedback">{errors.startHour}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.endHour,
                    })}
                    name="endHour"
                    value={this.state.endHour}
                    placeholder="End Hour"
                    onChange={this.onChange}
                  />
                  {errors.endHour && (
                    <div classnames="invalid-feedback">{errors.endHour}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.consumptionValue,
                    })}
                    name="consumptionValue"
                    value={this.state.consumptionValue}
                    placeholder="Consumption value"
                    step={"any"}
                    onChange={this.onChange}
                  />
                  {errors.consumptionValue && (
                    <div classnames="invalid-feedback">
                      {errors.consumptionValue}
                    </div>
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

AddConsumption.propTypes = {
  addConsumption: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addConsumption })(AddConsumption);
