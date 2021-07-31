import { useState } from "react";
import PropTypes from "prop-types";
import Counter from "./Counter";

export default function Nodes() {
  const [nodes, setNodes] = useState([]);
  const counter = Counter();

  const addNode = (id, color) => {
    counter.increment();
    setNodes((oldNodes) => {
      if (id > oldNodes.length + 1) {
        return oldNodes;
      }
      return [
        ...oldNodes,
        {
          id: `${id}`,
          radius: 8,
          depth: 1,
          color,
          x: id,
        },
      ];
    });
    return id;
  };

  function getNodes() {
    let nodesLength = 10;
    setNodes((oldNodes) => {
      nodesLength = oldNodes.length;
      return oldNodes;
    });
    return nodesLength;
  }

  const reset = () => {
    counter.reset();
    setNodes([]);
  };

  return {
    nodes,
    getNodes,
    addNode,
    count: counter.count,
    reset,
  };
}
const type = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      radius: PropTypes.number,
      depth: PropTypes.number,
      color: PropTypes.string,
      x: PropTypes.number,
    })
  ),
  getNodes: PropTypes.func,
  addAnode: PropTypes.func,
  reset: PropTypes.func,
  count: PropTypes.number,
};

export { type };
