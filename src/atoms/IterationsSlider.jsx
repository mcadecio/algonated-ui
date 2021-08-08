import React from "react";
import PropTypes from "prop-types";

const IterationsSlider = ({ value, setValue }) => {
  return (
    <div className="line controls">
      <input
        className="progress"
        type="range"
        min="1"
        max="20000"
        value={value}
        style={{ width: "50%" }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};
IterationsSlider.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

const IterationsOptions = ({ iterations, setIterations }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h5>Number of Iterations: </h5>
      <h5>{iterations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h5>
      <IterationsSlider value={iterations} setValue={setIterations} />
    </div>
  );
};
IterationsOptions.propTypes = {
  iterations: PropTypes.string.isRequired,
  setIterations: PropTypes.func.isRequired,
};

export { IterationsSlider, IterationsOptions };
