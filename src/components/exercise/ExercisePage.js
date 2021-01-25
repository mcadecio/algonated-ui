import React, {useState} from 'react';
import ExerciseProblem from './ExerciseProblem';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ExerciseEditor from './ExerciseEditor';
import DangerDismissibleAlert from '../DangerDismissibleAlert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Anime, {anime} from 'react-anime';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

function ExercisePage({problem}) {
    return (
        <div>
            <ExerciseProblem name={problem.name} description={problem.description}/>
            <br/>
            <ExerciseCodingArea exercise={problem.exercise} animation={problem.animation}/>
        </div>
    );
}

const ExerciseCodingArea = ({exercise, animation}) => {
    const alert = DangerDismissibleAlert({innerText: 'It looks like something went wrong, check the output !'});

    const [code, setCode] = useState(exercise.defaultStarterCode.join(' '));

    const [isLoading, setLoading] = useState(false);

    const [{consoleOutput, result, data, summary}, setConsoleOutput] = useState({
        isSuccess: false,
        consoleOutput: 'There\'s nothing here yet',
        result: [],
        data: exercise.data,
        summary: {
            fitness: 0,
            timeRun: '0ms',
            iterations: 0,
            efficacy: 'None'
        }
    });

    const sendCodeToServer = (value) => {
        setLoading(true);
        const request = {
            ...exercise,
            code: value
        };
        console.debug({request});
        console.debug(process.env.FYP_SERVER_DOMAIN);
        let endpoint = `${process.env.REACT_APP_FYP_SERVER_DOMAIN}${exercise.endpoint}`;

        if (process.env.NODE_ENV === 'development') {
            console.debug(process.env.NODE_ENV);
            endpoint = `http://localhost:80${exercise.endpoint}`;
        }
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(requestResult => {
            console.debug(requestResult);
            setConsoleOutput(requestResult);
            alert.setShow(!requestResult.isSuccess);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            <Row>
                <Col>
                    <ShadowedCard>
                        <Card.Header as={'h5'}>Exercise Coding Area</Card.Header>
                        <ExerciseEditor code={code} setCode={setCode}/>
                    </ShadowedCard>

                    <SubmitCodeButton
                        isLoading={isLoading}
                        callback={() => sendCodeToServer(code)}/>
                    <br/>
                    <br/>
                    <ExerciseConsole alert={alert.alert} consoleOutput={consoleOutput}/>
                </Col>
                <Col>
                    <ExerciseOptions />
                    <br/>
                    <ExerciseSummary summary={summary}/>
                    <br/>
                    <VisualiserArea solution={result} weights={data} animation={animation}/>
                </Col>
            </Row>
            <br/>
        </>
    );
};

const ExerciseOptions = () => {

    const map = new Map();
    map.set('#iterations', <IterationsOptions/>)
    map.set('#data', <p>Data</p>)

    const [selected, setSelected] = useState(map.get('#iterations'));

    return (
        <ShadowedCard>
            <Card.Header as={'h5'}>Options</Card.Header>
            <OptionsTabs changeTab={(selectedTab) => setSelected(map.get(selectedTab))}/>
            <Card.Body>
                {selected}
            </Card.Body>
        </ShadowedCard>
    );
}

const OptionsTabs = ({changeTab}) => {
    return (
            <Card.Header as={'h5'}>
                <Nav
                    onSelect={(selectedKey) => changeTab(selectedKey)}
                    fill={true}
                    variant="tabs"
                    defaultActiveKey={'#iterations'}>
                    <Nav.Item>
                        <Nav.Link href="#iterations">Iterations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#data">Data</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
        );
}

const IterationsOptions = () => {
    const [value, setValue] = useState("1000");

    return (
        <div style={{textAlign: 'center'}}>
            <h5>Number of Iterations: </h5>
            <h5>{(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h5>

            <IterationsSlider value={value} setValue={setValue}/>
        </div>
    );
}

const IterationsSlider = ({value, setValue}) => {

    return (
        <div className="line controls">
            <input className="progress" type="range" min="1" max="1000000" value={value}
                   onChange={(event) => {
                       setValue(event.target.value);
                   }}/>
        </div>
    );
}

const ExerciseConsole = ({consoleOutput, alert}) => (
    <ShadowedCard>
        <Card.Header as={'h5'}>Console Output</Card.Header>
        <Card.Body>
            {alert}
            <Card.Text as={'pre'}>{consoleOutput}</Card.Text>
        </Card.Body>
    </ShadowedCard>
);


const ExerciseSummary = ({summary}) => (
    <ShadowedCard>
        <Card.Header as={'h5'}>Summary</Card.Header>
        <ListGroup variant={'flush'}>
            <ListGroup.Item>Fitness: {summary.fitness}</ListGroup.Item>
            <ListGroup.Item>Time Run: {summary.timeRun}</ListGroup.Item>
            <ListGroup.Item>Iterations: {summary.iterations}</ListGroup.Item>
            <ListGroup.Item>Efficacy: {summary.efficacy}</ListGroup.Item>
        </ListGroup>
    </ShadowedCard>
);

const ShadowedCard = ({children}) => {
    return (
        <Card className={'shadow-sm'} style={{marginBottom: '1%'}}>
            {children}
        </Card>
    );
};

const VisualiserArea = ({solution, weights, animation}) => {

    return (
        <ShadowedCard>
            <Card.Header as={'h5'}>Visualiser Area</Card.Header>
            <Card.Body>
                <Container style={{background: 'white', border: '1px solid', textAlign: 'center'}}>
                    {animation({solution, weights})}
                </Container>
            </Card.Body>
        </ShadowedCard>
    );
};

const SubmitCodeButton = ({callback, isLoading}) => {
    return (

        <div className={'float-right'}>
            {isLoading && <Spinner
                animation="grow"
                size='sm'
                role='status'
                className={'dark-blue'}
            />}{' '}{' '}
            <Button
                type='button'
                className={'btn-dark-blue'}
                variant={'primary'}
                onClick={callback}
            >Submit Code</Button>
        </div>
    );
}

export {ExercisePage, ShadowedCard};
