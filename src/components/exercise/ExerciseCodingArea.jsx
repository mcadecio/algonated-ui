import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import ExerciseDemo from "./exerciseDemo/ExerciseDemo";
import ShadowedCard from "../../atoms/shadowedCard/ShadowedCard";
import { IterationsOptions } from "../../atoms/IterationsSlider";
import { DataOptions, MonacoExerciseEditor } from "./ExerciseEditor";

const ExerciseCodingArea = ({
  code,
  setCode,
  iterations,
  setIterations,
  data,
  setData,
  demoCallback,
}) => {
  const [constantData] = useState(data);
  const [selected, setSelected] = useState("#editor");
  const tabs = [
    {
      href: "#editor",
      title: "Editor",
    },
    {
      href: "#demo",
      title: "Demo",
    },
  ];

  const selectTab = (selection) => {
    if (selection === "#demo") {
      return <ExerciseDemo demoCallback={demoCallback} data={constantData} />;
    }
    if (selection === "#editor") {
      return (
        <EditorWithTabs
          code={code}
          setCode={setCode}
          data={data}
          setData={setData}
          iterations={iterations}
          setIterations={setIterations}
        />
      );
    }
    return <div />;
  };

  return (
    <ShadowedCard>
      <HeaderTabs changeTab={setSelected} tabNames={tabs} />
      {selectTab(selected)}
    </ShadowedCard>
  );
};
ExerciseCodingArea.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  iterations: PropTypes.string.isRequired,
  setIterations: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  demoCallback: PropTypes.func.isRequired,
};

const EditorWithTabs = ({
  data,
  iterations,
  setIterations,
  setData,
  code,
  setCode,
}) => {
  const tabs = [
    {
      href: "#editor",
      title: "Editor",
    },
    {
      href: "#iterations",
      title: "Iterations",
    },
    {
      href: "#data",
      title: "Data",
    },
  ];

  const [selected, setSelected] = useState("#editor");
  const selectTab = (selection) => {
    if (selection === "#iterations") {
      return (
        <Card.Body>
          <IterationsOptions
            iterations={iterations}
            setIterations={setIterations}
          />
        </Card.Body>
      );
    }
    if (selection === "#editor") {
      return (
        <MonacoExerciseEditor code={code} setCode={setCode} language="java" />
      );
    }
    if (selection === "#data") {
      return <DataOptions data={data} setData={setData} height="500" />;
    }
    return <div />;
  };
  return (
    <>
      {selectTab(selected)}
      <FooterTabs changeTab={setSelected} tabNames={tabs} />
    </>
  );
};
EditorWithTabs.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  iterations: PropTypes.string.isRequired,
  setIterations: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

const HeaderTabs = ({ changeTab, tabNames }) => {
  return (
    <Card.Header as="h5">
      <TabNavigation changeTab={changeTab} tabNames={tabNames} />
    </Card.Header>
  );
};
HeaderTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const FooterTabs = ({ changeTab, tabNames }) => {
  return (
    <Card.Footer as="b">
      <TabNavigation changeTab={changeTab} tabNames={tabNames} />
    </Card.Footer>
  );
};
FooterTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const TabNavigation = ({ changeTab, tabNames }) => {
  return (
    <Nav
      onSelect={(selectedKey) => changeTab(selectedKey)}
      fill
      variant="tabs"
      defaultActiveKey={tabNames[0].href}
    >
      {tabNames.map((tabName) => {
        return (
          <Nav.Item key={tabName.href}>
            <Nav.Link href={tabName.href}>{tabName.title}</Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
TabNavigation.propTypes = {
  changeTab: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default ExerciseCodingArea;
