import React, {Component, useEffect, useRef, useState} from 'react';
import Anime, {anime} from 'react-anime';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as d3 from 'd3';
import data from './data.json';
import {MyMonacoEditor} from './exercise/ExerciseEditor';


const CirclesAcross = () => (
    <Anime easing="easeOutElastic"
           loop={true}
           duration={1000}
           direction="alternate"
           delay={(el, index) => index * 240}
           translateX='13rem'
           scale={[.75, .9]}
    >
        <span className='glyphicon glyphicon-one-fine-dot blue'/>
        <span className='glyphicon glyphicon-one-fine-dot red'/>
        <span className='glyphicon glyphicon-one-fine-dot green'/>
    </Anime>
);

// Reactive Animations


class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {currentCount: 10};
    }

    timer() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
        if (this.state.currentCount < 1) {
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <>

                <div>{this.state.currentCount}</div>
            </>
        );
    }
}


const DFACounter = () => {

    return (
        <Container>
            <br/>
            <Row>
                <Col>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <BarUpAndDownAnimation/>
                </Col>
            </Row>
        </Container>
    );
};

const styles = {
    circle: {
        width: 64,
        height: 64,
        borderRadius: '100%',
        background: 'steelblue',
        margin: '0 auto',
        marginTop: '50%'
    },
    bar: {
        height: 500,
        width: 100,
        background: 'steelblue',
        margin: '0 auto'
    }
};

const NormalUpDownAnimation = () => (
    <UpDownAnimation
        initialIncrement={true}
        initialCount={0}
        incrementBy={100}
    />
);

const ReverseUpDownAnimation = () => (
    <UpDownAnimation
        initialIncrement={false}
        initialCount={100}
        incrementBy={100}
    />
);

const UpDownAnimation = ({initialCount, initialIncrement, incrementBy}) => {
    const [{count, increment}, setCounter] = useState({
        count: initialCount,
        increment: initialIncrement
    });

    const incrementCount = (valueToIncrement) => {
        setCounter(oldCount => ({
            count: oldCount.increment ? oldCount.count + valueToIncrement : oldCount.count - valueToIncrement,
            increment: !oldCount.increment
        }));
    };

    useEffect(() => {
        setInterval(() => {
            incrementCount(incrementBy);
        }, 1500);
    }, [incrementBy]);

    return (
        <Anime
            loop={true}
            translateY={[count]}
            duration={2000}
        >
            <div style={styles.circle}/>
        </Anime>
    );
};

const ChargedAnimation = () => {

    const [battery, updateBattery] = useState({
        percentage: 0,
        charged: function () {
            return `${this.percentage}%`;
        },
        cycles: 120
    });

    const incrementBatteryAndCycles = (interval) => {
        updateBattery(oldBattery => {
            let newPercentage = oldBattery.percentage + 1;
            if (oldBattery.percentage > 99) {
                clearInterval(interval);
                newPercentage = 100;
            }

            return {
                charged: oldBattery.charged,
                percentage: newPercentage,
                cycles: oldBattery.cycles + 1
            };
        });
    };

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
                incrementBatteryAndCycles(interval);
            },
            100);
    }, []);

    return (
        <div>
                <pre>

                {JSON.stringify({
                    charged: battery.charged(),
                    cycles: battery.cycles
                })}
                </pre>
        </div>
    );
};


const BarUpAndDownAnimation = () => {
    let initialCount = 0;
    let initialIncrement = false;
    let incrementBy = 500;
    const [{count, increment}, setCounter] = useState({
        count: initialCount,
        increment: initialIncrement
    });

    const incrementCount = (valueToIncrement) => {
        setCounter(oldCount => ({
            count: oldCount.increment ? oldCount.count + valueToIncrement : oldCount.count - valueToIncrement,
            increment: !oldCount.increment
        }));
    };

    // useEffect(() => {
    //     setInterval(() => {
    //         incrementCount(incrementBy);
    //     }, 1500);
    // }, [incrementBy]);


    return (
        <div>
            <Anime
                translateY={[count]}
                easing={'linear'}
            >
                <div style={{...styles.bar, height: 500, background: 'red'}}/>
            </Anime>
            <div style={{...styles.bar, left: '46%', zIndex: 0, position: 'absolute'}}/>
            <Button constiant={'light'} onClick={() => setCounter({count: 0, increment: true})}>
                UP
            </Button>
            <Button constiant='light' onClick={() => setCounter({count: 500, increment: false})}>
                DOWN
            </Button>
            <br/>
        </div>
    );
};

const Animation = () => {
    const animationRef = useRef(null);
    useEffect(() => {
        animationRef.current = anime({
            targets: '.el',
            keyframes: [
                {translateY: -40},
                {translateX: 250},
                {translateY: 40},
                {translateX: 0},
                {translateY: 0}
            ],
            delay: function (el, i) {
                return i * 100;
            },
            loop: false,
            easing: 'easeInOutSine'
        });
    });
    return (
        <div className="App">
            <button onClick={() => animationRef.current.restart()}>Restart</button>
            <div className="el" style={{...styles.bar, height: 500, background: 'red'}}/>
        </div>
    );

};

const ChargedAnimationAnimeJS = () => {
    const animationRef = useRef(null);

    let battery = {
        charged: '0%',
        cycles: 500
    };

    useEffect(() => {
        animationRef.current = anime({
            targets: battery,
            charged: '100%',
            cycles: 15,
            round: 1,
            easing: 'linear',
            update: function () {
                try {
                    document.querySelector('.el').innerHTML = JSON.stringify(battery);
                } catch {
                    console.log('interrupted');
                }
            }
        });
    }, []);
    return (
        <div className="App">
            <button onClick={() => animationRef.current.restart()}>Restart</button>
            <div className="el"/>
        </div>
    );

};

const FixedNodes = () => {
    const accessToRef = useRef();
    const data = {
        nodes: [{id: 'A'}, {'id': 'B'}, {'id': 'C'}, {'id': 'D'}],
        links:
            [{'source': 'A', 'target': 'B'},
                {'source': 'B', 'target': 'C'},
                {'source': 'C', 'target': 'A'},
                {'source': 'D', 'target': 'A'}]
    };

    const height = 250;
    const width = 400;

    useEffect(() => {
        accessToRef.current = d3.select('.myDiv').append('svg')
            .attr('width', width)
            .attr('height', height);

        const svg = accessToRef.current;

        const simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(function (d) {
                return d.id;
            }).distance(50))
            // .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(data.links)
            .enter().append('line')
            .attr('stroke', 'black');

        const node = svg.append('g')
            .selectAll('circle')
            .data(data.nodes)
            .enter().append('circle')
            .attr('r', 5);

        simulation
            .nodes(data.nodes)
            .on('tick', ticked)
            .alphaDecay(0);

        simulation.force('link')
            .links(data.links);

        function ticked() {
            link
                .attr('x1', function (d) {
                    return d.source.x;
                })
                .attr('y1', function (d) {
                    return d.source.y;
                })
                .attr('x2', function (d) {
                    return d.target.x;
                })
                .attr('y2', function (d) {
                    return d.target.y;
                });
            node
                .attr('cx', function (d) {
                    return d.x;
                })
                .attr('cy', function (d) {
                    return d.y;
                });
        }

    }, [data]);

    return (
        <>
            <Button onClick={() => data.nodes.push({id: 'F'})}
                    variant={'light'}>Add node</Button>
            <div className="myDiv"/>
        </>
    );
};

const SimpleNetworkGraph = () => {

    const animationRef = useRef();
    const [myData, updateData] = useState(data);

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        d3.select('svg').remove()
        animationRef.current = d3.select('.myDiv').append("svg")

        const svg  = animationRef.current
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Initialize the links
        const link = svg
            .selectAll("line")
            .data(myData.links)
            .enter()
            .append("line")
            .attr('stroke', 'black');

    // Initialize the nodes
        const node = svg
            .selectAll("circle")
            .data(myData.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)

        // Let's list the force we wanna apply on the network
        const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink()                               // This force provides links between nodes
                .id(function(d) { return d.id; })                     // This provide  the id of a node
                .links(data.links)                                    // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
            .on("end", ticked);

        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }

    }, [myData]);

    return (
        <>
            <Button onClick={() => updateData(old => {
                return {
                    links: old.links,
                        nodes: [...old.nodes, {id: "780"}]
                }
            })}
                    variant={'light'}>Add node</Button>
            <div className="myDiv"/>
        </>
    );
};

export default function Animations() {
    return (
        <MyMonacoEditor/>
    );
}