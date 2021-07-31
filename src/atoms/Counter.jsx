import { useState } from "react";

const Counter = () => {
  const [count, setCounter] = useState(1);

  const increment = () => {
    setCounter((oldC) => oldC + 1);
  };

  const reset = () => {
    setCounter(1);
  };

  return {
    count,
    increment,
    reset,
  };
};

export default Counter;
