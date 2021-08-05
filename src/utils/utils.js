const equals = (solution, anotherSolution) => {
  let i = solution.length;
  while (i > 0) {
    if (solution[i] !== anotherSolution[i]) return false;
    i -= 1;
  }
  return true;
};

export default equals;
