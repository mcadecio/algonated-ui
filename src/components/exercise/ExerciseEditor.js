import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import PropTypes from "prop-types";

const MonacoDataEditor = ({ data, setData, language, height = "500" }) => {
  return (
    <div>
      <MonacoExerciseEditor
        code={data}
        setCode={setData}
        language={language}
        height={height}
      />
    </div>
  );
};
MonacoDataEditor.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

const DataOptions = ({ data, setData, height }) => {
  const [innerData, setInnerData] = useState(data);

  useEffect(() => {
    setData(innerData);
  }, [innerData, setData]);

  return (
    <MonacoDataEditor
      data={innerData}
      setData={setInnerData}
      language="json"
      height={height}
    />
  );
};
DataOptions.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
};

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

const MonacoExerciseEditor = ({ code, setCode, language, height = "500" }) => {
  return (
    <div>
      <MonacoEditor
        width="auto"
        height={height}
        theme="vs-light"
        value={code}
        language={language}
        options={monacoEditorConfig()}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};
MonacoExerciseEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  height: PropTypes.string,
};
MonacoExerciseEditor.defaultProps = {
  height: "500",
};

export { MonacoExerciseEditor, MonacoDataEditor, DataOptions };
