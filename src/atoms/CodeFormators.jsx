import Highlight from "react-highlight.js";
import React from "react";
import PropTypes from "prop-types";

const JavaCode = ({ code }) => <Highlight language="java">{code}</Highlight>;
JavaCode.propTypes = {
  code: PropTypes.string.isRequired,
};

const JsonCode = ({ json }) => <Highlight language="json">{json}</Highlight>;

JsonCode.propTypes = {
  json: PropTypes.string.isRequired,
};

export { JavaCode, JsonCode };
