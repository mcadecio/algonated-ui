import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ControlledSVGScale } from "./SVGScales";
import { SimpleWidthCalculator } from "./widthCalculators";
import arrayEquals from "../../../utils/arrayEquals";

const BalanceAnimation = ({ solution, weights, solutions }) => {
  const [{ left, right }, setLeftRight] = useState(
    SimpleWidthCalculator({ solution, weights })
  );
  const [fitness, setFitness] = useState(0);
  const updateLeftRight = (newLeft, newRight) => {
    setLeftRight({
      left: newLeft,
      right: newRight,
    });
  };

  useEffect(() => {
    if (solutions.length !== 0) {
      const replay = async () => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        for (let i = 0; i < solutions.length; i += 1) {
          const newWidth = SimpleWidthCalculator({
            solution: solutions[i],
            weights,
          });
          if (i > 0 && !arrayEquals(solutions[i - 1], solutions[i])) {
            setFitness(Math.abs(newWidth.left - newWidth.right));
            updateLeftRight(newWidth.left, newWidth.right);
            // eslint-disable-next-line no-await-in-loop
            await delay(1);
          }
        }
      };

      replay();
    }
  }, [solutions, weights, setFitness]);

  return (
    <div>
      <h5 className="dark-blue-text">Fitness: {fitness}</h5>
      <BalanceScale left={left} right={right} weights={weights} />
    </div>
  );
};
BalanceAnimation.propTypes = {
  solution: PropTypes.arrayOf(PropTypes.number).isRequired,
  solutions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  weights: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const BalanceScale = ({ left, right, weights }) => {
  const [topPartRotation, setTopPartRotation] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const maxRotation = 30;
    const maxYTranslation = 50;

    const offset = right - left;

    const weightsSum = weights.reduce((a, b) => a + b, 0);
    let rotation = (offset * maxRotation) / weightsSum;
    let translation = (offset * maxYTranslation) / weightsSum;

    if (rotation > maxRotation) {
      rotation = maxRotation;
    } else if (rotation < -maxRotation) {
      rotation = -maxRotation;
    }

    if (translation > maxYTranslation) {
      translation = maxYTranslation;
    } else if (translation < -maxYTranslation) {
      translation = -maxYTranslation;
    }

    setTopPartRotation(rotation);
    setTranslateY(translation);
  }, [left, right, weights]);

  return (
    <>
      <ControlledSVGScale
        left={left}
        right={right}
        topPartRotation={topPartRotation}
        translateY={translateY}
      />
    </>
  );
};
BalanceScale.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  weights: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BalanceAnimation;
