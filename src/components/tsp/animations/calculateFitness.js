const calculateFitness = (solution, distances) => {
  const numberOfCities = solution.length;

  if (numberOfCities === 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < numberOfCities - 1; i += 1) {
    const city = solution[i];
    const nextCity = solution[i + 1];
    sum += distances[city][nextCity];
  }

  const endCity = solution[numberOfCities - 1];
  const startCity = solution[0];

  sum += distances[endCity][startCity];

  return sum;
};

export default calculateFitness;
