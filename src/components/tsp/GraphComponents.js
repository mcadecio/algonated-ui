import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";

const fillColor = "rgb(97, 205, 187)";
const outlineColor = "rgb(73,154,141)";
const svgWidth = 700;
const svgHeight = 500;

const Graph = ({ nodes, links }) => {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{ enableBackground: `new 0 0 ${svgWidth} ${svgHeight}` }}
      xmlSpace="preserve"
    >
      {links.map((link) => {
        const sourceNode = nodes.find((node) => node.id === link.source);
        const targetNode = nodes.find((node) => node.id === link.target);

        if (sourceNode === undefined || targetNode === undefined) {
          return <></>;
        }

        return (
          <Edge
            key={`${sourceNode.id}/${targetNode.id}`}
            sourceNode={sourceNode}
            targetNode={targetNode}
          />
        );
      })}
      {nodes.map((node) => (
        <Node name={`${node.id}`} key={node.id} x={node.x} y={node.y} />
      ))}
    </svg>
  );
};
Graph.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.number,
      target: PropTypes.number,
      distance: PropTypes.number,
    })
  ).isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      radius: PropTypes.number,
      depth: PropTypes.number,
      color: PropTypes.string,
      x: PropTypes.number,
    })
  ).isRequired,
};

const Edge = ({ sourceNode, targetNode }) => {
  return (
    <line
      className="link"
      y1={sourceNode.y}
      x1={sourceNode.x}
      y2={targetNode.y}
      x2={targetNode.x}
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  );
};
Edge.propTypes = {
  sourceNode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  targetNode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

const Node = ({ name, x, y }) => {
  return (
    <OverlayTrigger
      key={`${x}/${y}`}
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${x}/${y}`}>
          <strong>{name}</strong>
        </Tooltip>
      }
    >
      <g>
        <circle
          cx={x}
          cy={y}
          r={8}
          fill={fillColor}
          scale={3}
          stroke={outlineColor}
          strokeWidth={1}
        />
      </g>
    </OverlayTrigger>
  );
};
Node.propTypes = {
  name: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

const createSpiralNodes = (nNodes, degree, startingIndex = 0) => {
  const nodes = [];
  for (let i = startingIndex + 5; i < nNodes + 5; i += 1) {
    const angle = degree * i;
    const x = svgWidth / 2 + (1 + angle) * Math.cos(angle);
    const y = svgHeight / 2 + (1 + angle) * Math.sin(angle);
    nodes.push({
      id: i - 5,
      name: i - 5,
      x,
      y,
    });
  }

  return nodes;
};

const createNormalSpiralNodes = (nNodes, startingIndex = 0) => {
  return createSpiralNodes(nNodes, 4, startingIndex);
};

const createReversedSpiralNodes = (nNodes, startingIndex = 0) => {
  return createSpiralNodes(nNodes, -4, startingIndex);
};

const createMixedSpiralNodes = (nNodes) => {
  const normal = createNormalSpiralNodes(nNodes / 2, 0);
  const reversed = createReversedSpiralNodes(nNodes, Math.ceil(nNodes / 2));

  return [...normal, ...reversed];
};

const createSequentialEdges = (nEdges) => {
  const edges = [];
  for (let i = 0; i < nEdges - 1; i += 1) {
    edges.push({
      source: i,
      target: i + 1,
    });
  }
  return edges;
};

export { Edge, Node, Graph, createMixedSpiralNodes, createSequentialEdges };
