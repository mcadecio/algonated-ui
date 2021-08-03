const equals = (solution, anotherSolution) => {
  let i = solution.length;
  while (i--) {
    if (solution[i] !== anotherSolution[i]) return false;
  }
  return true;
};

export { equals };
