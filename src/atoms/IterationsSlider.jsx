import React, { useEffect, useState } from "react";
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
  const [innerValue, setInnerValue] = useState(iterations);

  useEffect(() => {
    setIterations(innerValue);
  }, [innerValue, setIterations]);

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Number of Iterations: </h5>
      <h5>{innerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h5>
      <IterationsSlider
        value={innerValue.toString()}
        setValue={setInnerValue}
      />
    </div>
  );
};
IterationsOptions.propTypes = {
  iterations: PropTypes.number.isRequired,
  setIterations: PropTypes.func.isRequired,
};

export { IterationsSlider, IterationsOptions };
