import { useState } from "react";
import PropTypes from "prop-types";
import Counter from "./Counter";

const Links = () => {
  const [links, setLinks] = useState([]);
  const counter = Counter();

  const reset = () => {
    counter.reset();
    setLinks([]);
  };

  const addLinks = (source, target, distance) => {
    counter.increment();
    setLinks((oldLinks) => {
      return [
        ...oldLinks,
        {
          source,
          target,
          distance: Math.round(distance),
        },
      ];
    });
  };

  const replace = (newLinks) => {
    setLinks(newLinks);
  };

  return {
    links,
    addLinks,
    reset,
    replace,
    count: counter.count,
  };
};

const type = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.number,
      target: PropTypes.number,
      distance: PropTypes.number,
    })
  ),
  addLinks: PropTypes.func,
  reset: PropTypes.func,
  replace: PropTypes.func,
  count: PropTypes.number,
};

export default Links;
export { type };
