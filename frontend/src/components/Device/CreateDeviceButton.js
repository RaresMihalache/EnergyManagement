import React from "react";
import { Link } from "react-router-dom";

const CreateDeviceButton = () => {
  return (
    <React.Fragment>
      <Link to="/addDevice" className="btn btn-lg btn-info">
        Create a Device
      </Link>
    </React.Fragment>
  );
};

export default CreateDeviceButton;
