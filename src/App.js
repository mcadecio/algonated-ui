import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ReactPlayer from "react-player/file";
import Spinner from "react-bootstrap/Spinner";
import ScalesExercise from "./components/exercise/scales/ScalesExercise";
import TSPExercise from "./components/exercise/tsp/TSPExercise";
import ExerciseView from "./components/exercise/ExerciseView";

const NotFound = () => (
  <>
    <br />
    <div className="d-flex justify-content-center">
      <ReactPlayer
        playing
        muted
        url="https://cdn.dribbble.com/users/5139370/screenshots/15008550/media/a9b073c175dd3d5d93c2c681da6a311e.mp4"
        loop
        controls={false}
      />
    </div>
  </>
);

export default function App() {
  return (
    <Router>
      <MainNavBar />
      <div style={{ margin: "3%" }}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/exercises" />
          </Route>
          <Route exact path="/exercises" component={ExerciseView} />
          <Route exact path="/exercises/scales" component={ScalesExercise} />
          <Route exact path="/exercises/tsp" component={TSPExercise} />
          <Route
            exact
            path="/feedback"
            component={() => {
              window.location.href =
                "https://docs.google.com/forms/d/1LnA9jmOu3EMRR66y2i5SLDGrD7BR6uKNzbAOP1845w4";
              return (
                <div>
                  <span>Redirecting...</span>{" "}
                  <Spinner animation="border" role="status" />
                </div>
              );
            }}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const MainNavBar = () => (
  <div style={{ marginBottom: "5%" }}>
    <Navbar
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "#00325b" }}
      fixed="top"
    >
      <Navbar.Brand>Algorithms Animated</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/exercises">
          Exercises
        </Nav.Link>
        <Nav.Link as={Link} to="/feedback">
          Feedback
        </Nav.Link>
      </Nav>
    </Navbar>
  </div>
);
