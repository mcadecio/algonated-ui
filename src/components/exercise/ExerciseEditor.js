import React from "react";
import MonacoEditor from "react-monaco-editor";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectCode, updateCode } from "../../store/exercise.store";

const monacoEditorConfig = () => {
  return {
    selectOnLineNumbers: false,
    fontFamily: "SourceCodePro, monospace",
    fontSize: 15,
    wordWrap: "on",
    showUnused: true,
    scrollBeyondLastLine: false,
    renderWhitespace: "boundary",
    autoIndent: "full",
    automaticLayout: true,
  };
};

const DataOptions = ({ data, setData, height }) => {
  return (
    <div>
      <MonacoEditor
        width="auto"
        height={height}
        theme="vs-light"
        value={data}
        language="json"
        options={monacoEditorConfig()}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};
DataOptions.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
};

const MonacoExerciseEditor = ({ language, height = "500" }) => {
  const code = useSelector(selectCode);
  const dispatch = useDispatch();

  return (
    <div>
      <MonacoEditor
        width="auto"
        height={height}
        theme="vs-light"
        value={code}
        language={language}
        options={monacoEditorConfig()}
        onChange={(value) => dispatch(updateCode(value))}
      />
    </div>
  );
};
MonacoExerciseEditor.propTypes = {
  language: PropTypes.string.isRequired,
  height: PropTypes.string,
};
MonacoExerciseEditor.defaultProps = {
  height: "500",
};

export { MonacoExerciseEditor, DataOptions };
