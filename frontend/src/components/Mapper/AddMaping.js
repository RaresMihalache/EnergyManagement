import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMapping } from "../../actions/mappingActions";
import classnames from "classnames";

class AddMapping extends Component {
  constructor() {
    super();

    this.state = {
      userId: "",
      deviceId: "",
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
    const newMapping = {
      userId: this.state.userId,
      deviceId: this.state.deviceId,
    };

    this.props.createMapping(
      newMapping.userId,
      newMapping.deviceId,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="mapping">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Mapping</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="User ID"
                    name="userId"
                    value={this.state.userId}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Device ID"
                    name="deviceId"
                    value={this.state.deviceId}
                    onChange={this.onChange}
                  />
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

AddMapping.propTypes = {
  createMapping: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createMapping })(AddMapping);
