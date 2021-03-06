import Card from "react-bootstrap/Card";
import React from "react";
import { JavaCode, JsonCode } from "../../atoms/CodeFormators";
import config from "./tsp.exercise.json";

const TSPDescription = () => (
  <div>
    <ProblemBrief />
    <hr />
    <ClassDescription />
    <hr />
    <FunctionDescription />
    <hr />
    <ReturnDescription />
    <hr />
    <TemplateDescription />
    <hr />
    <Instructions />
    <hr />
    <AdditionalDescription />
  </div>
);

const ProblemBrief = () => (
  <>
    <Card.Text>
      <b>Problem Description</b>
      <br />
      The travelling salesman problem (also called the traveling salesperson
      problem or TSP) asks the following question:
      <br />
    </Card.Text>
    <blockquote>
      <i>
        Given a list of cities and the distances between each pair of cities,
        what is the shortest possible route that visits each city exactly once
        and returns to the origin city?
      </i>
    </blockquote>
  </>
);

const ClassDescription = () => (
  <Card.Text>
    <b>Class Description</b>
    <br />
    The name of your public class should be <b>TSPProblem</b>
  </Card.Text>
);

const FunctionDescription = () => (
  <>
    <Card.Text>
      <b>Function Description</b>
      <br />
      Your class <b>must</b> contain at least one method with the following
      signature:
    </Card.Text>

    <JavaCode
      code={`    public List<Integer> runTSP(double[][] distances, int iterations) {}`}
    />

    <ul>
      <li>
        <i>
          <b>distances</b>:{" "}
        </i>
        A matrix containing the distances between cities
        <pre>
          eg.
          {`
    [[0.0, 1.0, 2.0], 
    [1.0. 0.0, 3.0], 
    [2.0, 3.0, 0.0]]`}
        </pre>
      </li>
      <li>
        <i>
          <b>iterations</b>:{" "}
        </i>
        How many iterations you algorithm should run for
      </li>
    </ul>
  </>
);

const ReturnDescription = () => (
  <>
    <Card.Text>
      <b>Returns</b>
    </Card.Text>

    <ul>
      <li>
        <b>List&lt;Integer&gt;</b>: The return value should the final solution
        produced by the algorithm
      </li>
    </ul>
  </>
);

const AdditionalDescription = () => (
  <>
    <Card.Text>
      <b>Additional</b>
      <br />
      In order to keep track of the changes to your solution, you will need to
      declare a field called: <b>solutions</b>.
      <br />
      You should use the method <i>add</i> to store your solution after each
      iteration. e.g
    </Card.Text>
    <JavaCode
      code={`        for (int i = 0; i < iterations; i++) {
            solutions.add([1, 3, 2]);
        }`}
    />
  </>
);

const TemplateDescription = () => (
  <>
    <Card.Text>
      <b>Template</b>
      <br />
      To get you started I have provided you with the template below:
    </Card.Text>
    <JavaCode code={config.exercise.defaultStarterCode} />
  </>
);

const Instructions = () => (
  <div>
    <Card.Text>
      <b>Instructions</b>
      <br />- <i>Editor:</i> Use the editor to write your code.
      <br />- <i>Iterations:</i> You can adjust the amount of iterations.
      <br />- <i>Data:</i> In the Data tab, you can add your own data or modify
      the existing. Please make sure the data is in json format and follows the
      following format:
    </Card.Text>
    <JsonCode
      json={`           {
                "data": [...]
           }`}
    />
    <Card.Text>
      <br />- <i>Demo:</i> In the Demo tab, you can run run of the existing
      algorithms and see how they perform.
    </Card.Text>
  </div>
);

export default TSPDescription;
