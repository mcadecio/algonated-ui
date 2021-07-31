import { ResponsiveNetwork } from "@nivo/network";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { createMixedSpiralNodes, Graph } from "../GraphComponents";
import Nodes, { type as NodesType } from "../../../../atoms/Nodes";
import Links, { type as LinksType } from "../../../../atoms/Links";
import { triggerAnimation, triggerLinkAnimation } from "./animationTriggers";
import calculateFitness from "./calculateFitness";

const propTypes = {
  solution: PropTypes.arrayOf(PropTypes.number),
  weights: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  links: LinksType.links,
  solutions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  nodes: NodesType.nodes,
};

const ResponsiveNetworkAnimation = ({ solution, weights: distances }) => {
  const nodes = Nodes();
  const links = Links();

  const [animationRunning, setRunning] = useState(false);

  return (
    <div>
      <Button
        variant="light"
        disabled={animationRunning}
        onClick={() =>
          triggerAnimation(solution, distances, setRunning, links, nodes)
        }
      >
        Run Animation
      </Button>
      <div style={{ height: "700px" }}>
        <MyResponsiveNetwork
          nodes={nodes.nodes}
          links={links.links.map((link) => {
            return {
              source: `${link.source}`,
              target: `${link.target}`,
              distance: Math.round(link.distance),
            };
          })}
        />
      </div>
    </div>
  );
};
ResponsiveNetworkAnimation.propTypes = {
  solution: propTypes.solution.isRequired,
  weights: propTypes.weights.isRequired,
};

const FixedNetworkAnimation = ({ solution, weights: distances, solutions }) => {
  const links = Links();

  const [animationRunning, setRunning] = useState(false);

  const [fitness, setFitness] = useState(calculateFitness(solution, distances));

  return (
    <div>
      <h5 className="dark-blue-text">Fitness: {fitness}</h5>
      <Button
        type="button"
        className="btn-dark-blue"
        variant="primary"
        disabled={animationRunning}
        onClick={() =>
          triggerLinkAnimation(
            solution,
            distances,
            setRunning,
            links,
            solutions,
            setFitness
          )
        }
      >
        Run Animation
      </Button>
      <div>
        <SimpleResponsiveNetworkGraph solution={solution} links={links.links} />
      </div>
    </div>
  );
};
FixedNetworkAnimation.propTypes = {
  solution: propTypes.solution.isRequired,
  weights: propTypes.weights.isRequired,
  solutions: propTypes.solutions.isRequired,
};

const MyResponsiveNetwork = ({ nodes, links }) => {
  return (
    <ResponsiveNetwork
      nodes={nodes}
      links={links}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      repulsivity={25}
      iterations={90}
      nodeColor={(e) => e.color}
      nodeBorderWidth={1}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      linkThickness={(e) => {
        return 2 * (2 - e.source.depth);
      }}
      motionStiffness={160}
      motionDamping={12}
      animate
    />
  );
};
MyResponsiveNetwork.propTypes = {
  links: propTypes.links.isRequired,
  nodes: propTypes.nodes.isRequired,
};

const SimpleResponsiveNetworkGraph = ({ links, solution }) => {
  const nodes = createMixedSpiralNodes(solution.length);
  return <Graph links={links} nodes={nodes} />;
};
SimpleResponsiveNetworkGraph.propTypes = {
  links: propTypes.links.isRequired,
  solution: propTypes.solution.isRequired,
};

export {
  FixedNetworkAnimation,
  SimpleResponsiveNetworkGraph,
  ResponsiveNetworkAnimation,
};
