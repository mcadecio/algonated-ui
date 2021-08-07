import calculateFitness from "./calculateFitness";
import arrayEquals from "../../../utils/arrayEquals";
/* eslint-disable no-await-in-loop */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const createNodes = async (addNode, solution) => {
  for (let i = 0; i < solution.length; i += 1) {
    let thisColor = "rgb(97, 205, 187)";
    if (i === solution[0]) {
      thisColor = "rgb(255, 0, 0)";
    } else if (i === solution[solution.length - 1]) {
      thisColor = "rgb(0, 0, 255)";
    }
    addNode(i, thisColor);
    await delay(100);
  }
};

const createLinks = async (addLinks, solution, distances, timeout = 200) => {
  for (let i = 0; i < solution.length - 1; i += 1) {
    const city = solution[i];
    const nextCity = solution[i + 1];
    const distance = distances[city][nextCity];
    addLinks(city, nextCity, distance);
    await delay(timeout);
  }
};

const triggerAnimation = async (
  solution,
  distances,
  setRunning,
  links,
  nodes
) => {
  setRunning(true);
  links.reset();
  nodes.reset();
  if (
    solution.length === distances.length &&
    solution.length === distances[0].length
  ) {
    await createNodes(nodes.addNode, solution);
    await createLinks(links.addLinks, solution, distances);
  }
  setRunning(false);
};

const triggerLinkAnimation = async (
  solution,
  distances,
  setRunning,
  links,
  solutions,
  setFitness
) => {
  setRunning(true);
  links.reset();
  if (
    solution.length === distances.length &&
    solution.length === distances[0].length
  ) {
    if (solutions.length !== 0) {
      setFitness(calculateFitness(solutions[0], distances));
      await createLinks(links.addLinks, solutions[0], distances, 100);
      for (let i = 1; i < solutions.length; i += 1) {
        const newLinks = [];
        const addLinks = (city, nextCity, distance) => {
          newLinks.push({
            source: city,
            target: nextCity,
            distance,
          });
        };
        if (!arrayEquals(solutions[i - 1], solutions[i])) {
          await createLinks(addLinks, solutions[i], distances, 0.1);
          setFitness(calculateFitness(solutions[i], distances));
          links.replace(newLinks);
        }
      }
    } else {
      await createLinks(links.addLinks, solution, distances);
    }
  }
  setRunning(false);
};

export { triggerAnimation, triggerLinkAnimation };
