import { useEffect, useState } from "react";

const maxWidth = 747;

const calculateFitness = (solution, weights) => {
  let sumOfWeightsOnTheLeft = 0;
  let sumOfWeightsOnTheRight = 0;

  for (let i = 0; i < solution.length; i += 1) {
    if (solution[i] === 0) {
      sumOfWeightsOnTheLeft += weights[i];
    } else {
      sumOfWeightsOnTheRight += weights[i];
    }
  }

  return {
    left: sumOfWeightsOnTheLeft,
    right: sumOfWeightsOnTheRight,
  };
};

const SimpleWidthCalculator = ({ solution, weights }) => {
  const randomStart = Math.floor(Math.random() * Math.floor(3682913));
  let left = randomStart;
  let right = Math.abs(randomStart - 3682913);

  const sum = calculateFitness(solution, weights);

  if (sum.left !== 0 || sum.right !== 0) {
    left = sum.left;
    right = sum.right;
  }

  return { left, right };
};

const WidthCalculator = ({ solution, weights }) => {
  const [{ leftRectangleWidth, rightRectangleWidth }, setWidth] = useState({
    leftRectangleWidth: maxWidth / 2,
    rightRectangleWidth: maxWidth / 2,
  });

  const [inputWidth, updateWidth] = useState(50.0);

  const incrementWidth = (percentage) => {
    updateWidth((oldWidth) => oldWidth + percentage);
  };

  const decrementWidth = (percentage) => {
    updateWidth((oldWidth) => oldWidth - percentage);
  };

  useEffect(() => {
    setWidth(() => {
      const percentage = inputWidth * 0.01;
      let firstWidth = percentage * maxWidth;

      if (firstWidth > maxWidth) {
        firstWidth = maxWidth;
      } else if (firstWidth < 0) {
        firstWidth = 0;
      }

      return {
        leftRectangleWidth: firstWidth,
        rightRectangleWidth: maxWidth - firstWidth,
      };
    });
  }, [inputWidth]);

  useEffect(() => {
    setTimeout(async () => {
      updateWidth(50);
      const totalWeight = weights.reduce(
        (weight, anotherWeight) => weight + anotherWeight
      );
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));

      for (let i = 0; i < solution.length; i += 1) {
        const percentage = (weights[i] / totalWeight) * 100;

        if (solution[i] === 0) {
          incrementWidth(percentage);
        } else {
          decrementWidth(percentage);
        }
        // eslint-disable-next-line no-await-in-loop
        await delay(50);
      }
    }, 500);
  }, [solution, weights]);

  return {
    leftRectangleWidth,
    rightRectangleWidth,
    inputWidth,
  };
};

export { WidthCalculator, SimpleWidthCalculator };
