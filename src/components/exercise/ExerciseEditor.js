import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  setData: PropTypes.func,
  language: PropTypes.string,
  height: PropTypes.string,
};

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
  data: propTypes.data.isRequired,
  setData: propTypes.setData.isRequired,
  language: propTypes.language.isRequired,
  height: propTypes.height.isRequired,
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
  data: propTypes.data.isRequired,
  setData: propTypes.setData.isRequired,
  height: propTypes.height.isRequired,
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
const MyMonacoEditor = () => {
  const [editorValue, setValue] = useState("{}");

  return (
    <div style={{ border: "solid 1px", width: "803px", height: "300px" }}>
      <MonacoEditor
        width="800"
        height="300"
        theme="vs-dark"
        value={editorValue}
        language="json"
        options={monacoEditorConfig()}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
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
  setCode: propTypes.setData.isRequired,
  language: propTypes.language.isRequired,
  height: propTypes.height.isRequired,
};

export { MyMonacoEditor, MonacoExerciseEditor, MonacoDataEditor, DataOptions };
