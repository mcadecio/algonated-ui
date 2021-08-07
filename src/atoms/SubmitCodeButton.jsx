import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import React from "react";

const SubmitCodeButton = ({ callback, isLoading }) => {
  return (
    <div className="float-right">
      {isLoading && (
        <Spinner
          animation="grow"
          size="sm"
          role="status"
          className="dark-blue"
        />
      )}{" "}
      <Button
        type="button"
        className="btn-dark-blue"
        variant="primary"
        onClick={callback}
      >
        Submit Code
      </Button>
    </div>
  );
};
SubmitCodeButton.propTypes = {
  callback: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SubmitCodeButton;
