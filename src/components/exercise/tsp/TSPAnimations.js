import {ResponsiveNetwork} from '@nivo/network';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {createMixedSpiralNodes, Graph} from './GraphComponents';

const delay = ms => new Promise(res => setTimeout(res, ms));

const ResponsiveNetworkAnimation = ({solution, weights: distances, test = false}) => {
    let nodes = Nodes();
    let links = Links();

    let [animationRunning, setRunning] = useState(false);

    return (
        <div>
            <Button variant={'light'} disabled={animationRunning}
                    onClick={() => triggerAnimation(solution, distances, setRunning, links, nodes)}>
                Run Animation
            </Button>
            <div style={{height: '700px'}}>
                <MyResponsiveNetwork nodes={nodes.nodes} links={links.links.map(link => {
                    return {
                        source: `${link.source}`,
                        target: `${link.target}`,
                        distance: Math.round(link.distance)
                    };
                })}/>
            </div>
            {test && <DebugOptions nodes={nodes} links={links}/>}
        </div>
    );
};

const FixedNetworkAnimation = ({solution, weights: distances, solutions}) => {
    let links = Links();

    let [animationRunning, setRunning] = useState(false);

    const [fitness, setFitness] = useState(calculateFitness(solution, distances));

    return (
        <div>
            <div>Fitness: {fitness}</div>
            <Button variant={'light'} disabled={animationRunning}
                    onClick={() => triggerLinkAnimation(solution, distances, setRunning, links, solutions, setFitness)}>
                Run Animation
            </Button>
            <div>
                <SimpleResponsiveNetworkGraph solution={solution} links={links.links}/>
            </div>
        </div>
    );
};

const calculateFitness = (solution, distances) => {
    let numberOfCities = solution.length;

    if (numberOfCities === 0) {
        return -1;
    }

    let sum = 0;
    for (let i = 0; i < numberOfCities - 1; i++) {
        let city = solution[i];
        let nextCity = solution[i + 1];
        sum = sum + distances[city][nextCity];
    }

    let endCity = solution[numberOfCities - 1];
    let startCity = solution[0];

    sum = sum + distances[endCity][startCity];

    return sum;
}

const MyResponsiveNetwork = ({nodes, links}) => {
    return (
        <ResponsiveNetwork
            nodes={nodes}
            links={links}
            margin={{top: 0, right: 0, bottom: 0, left: 0}}
            repulsivity={25}
            iterations={90}
            nodeColor={function (e) {
                return e.color;
            }}
            nodeBorderWidth={1}
            nodeBorderColor={{from: 'color', modifiers: [['darker', 0.8]]}}
            linkThickness={function (e) {
                return 2 * (2 - e.source.depth);
            }}
            motionStiffness={160}
            motionDamping={12}
            animate={true}
        />
    );
};


const Nodes = () => {
    const [nodes, setNodes] = useState([]);
    const counter = Counter();

    const addNode = (id, color) => {
        counter.increment();
        setNodes(oldNodes => {
            if (id > oldNodes.length + 1) {
                return oldNodes;
            }
            return [
                ...oldNodes, {
                    id: `${id}`,
                    radius: 8,
                    depth: 1,
                    color: color,
                    x: id
                }];
        });
        return id;
    };

    function getNodes() {
        let nodesLength = 10;
        setNodes(oldNodes => {
            nodesLength = oldNodes.length;
            return oldNodes;
        });
        return nodesLength;
    }

    const reset = () => {
        counter.reset();
        setNodes([]);
    };

    return {
        nodes,
        getNodes,
        addNode,
        count: counter.count,
        reset
    };
};

const Links = () => {
    const [links, setLinks] = useState([]);
    const counter = Counter();

    const reset = () => {
        counter.reset();
        setLinks([]);
    };

    const addLinks = (source, target, distance) => {
        counter.increment();
        setLinks(oldLinks => {
            return [...oldLinks, {
                source: source,
                target: target,
                distance: Math.round(distance)
            }];
        });
    };

    const replace = (newLinks) => {
        setLinks(newLinks);
    }

    return {
        links,
        addLinks,
        reset,
        replace,
        count: counter.count
    };
};

const Counter = () => {
    const [count, setCounter] = useState(1);

    const increment = () => {
        setCounter(oldC => oldC + 1);
    };

    const reset = () => {
        setCounter(1);
    };

    return {
        count,
        increment,
        reset
    };
};


const DebugOptions = ({nodes, links}) => {
    let color = 'rgb(97, 205, 187)';

    let solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let weights = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    ];

    useEffect(() => {
        links.reset();
        nodes.reset();

        let timeout = setTimeout(async () => {
            for (let i = 0; i < solution.length; i++) {
                if (nodes.getNodes() === 0 && i > 0) {
                    return;
                }
                let thisColor = 'rgb(97, 205, 187)';
                if (i === solution[0]) {
                    thisColor = 'rgb(255, 0, 0)';
                } else if (i === solution[solution.length - 1]) {
                    thisColor = 'rgb(0, 0, 255)';
                }
                nodes.addNode(i, thisColor);
                await delay(100);
            }

            for (let i = 0; i < solution.length - 1; i++) {
                if (nodes.getNodes() === 0) {
                    return;
                }
                let city = solution[i];
                let nextCity = solution[i + 1];
                let distance = weights[city][nextCity];
                links.addLinks(city, nextCity, distance);
                await delay(500);
            }
        });

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <h1>{nodes.count}</h1>
            <Button onClick={() => nodes.addNode(nodes.count, color)}>
                Add Node
            </Button>
            <br/>
            <h1>{links.count}</h1>
            <Button onClick={() => links.addLinks(links.count, links.count + 1, 5)}>
                Add New Link
            </Button>
            <h1>Reset Links</h1>
            <Button onClick={() => links.reset()}>
                Reset
            </Button>
            <h1>Reset Nodes</h1>
            <Button onClick={() => nodes.reset()}>
                Reset
            </Button>
            <h1>Stop</h1>
            <Button onClick={async () => {
                links.reset();
                nodes.reset();
            }}>
                Reset
            </Button>
        </>
    );
};


const triggerAnimation = async (solution, distances, setRunning, links, nodes) => {
    setRunning(true);
    links.reset();
    nodes.reset();
    if (solution.length === distances.length && solution.length === distances[0].length) {
        await createNodes(nodes.addNode, solution);
        await createLinks(links.addLinks, solution, distances);
    }
    setRunning(false);
};

const triggerLinkAnimation = async (solution, distances, setRunning, links, solutions, setFitness) => {
    setRunning(true);
    links.reset();
    if (solution.length === distances.length && solution.length === distances[0].length) {
        if (solutions.length !== 0) {
            await createLinks(links.addLinks, solutions[0], distances);
            for (let i = 1; i < solutions.length; i++) {
                let newLinks = [];
                const addLinks = (city, nextCity, distance) => {
                    newLinks.push({
                        source: city,
                        target: nextCity,
                        distance
                    })
                }
                await createLinks(addLinks, solutions[i], distances, 0);
                setFitness(calculateFitness(solutions[i], distances))
                links.replace(newLinks);
            }
        } else {
            await createLinks(links.addLinks, solution, distances);
        }
    }
    setRunning(false);
};

const createNodes = async (addNode, solution) => {
    for (let i = 0; i < solution.length; i++) {
        let thisColor = 'rgb(97, 205, 187)';
        if (i === solution[0]) {
            thisColor = 'rgb(255, 0, 0)';
        } else if (i === solution[solution.length - 1]) {
            thisColor = 'rgb(0, 0, 255)';
        }
        addNode(i, thisColor);
        await delay(100);
    }
};

const createLinks = async (addLinks, solution, distances, timeout = 200) => {
    for (let i = 0; i < solution.length - 1; i++) {
        let city = solution[i];
        let nextCity = solution[i + 1];
        let distance = distances[city][nextCity];
        addLinks(city, nextCity, distance);
        await delay(timeout);
    }
};

const SimpleResponsiveNetworkGraph = ({links, solution}) => {
    const nodes = createMixedSpiralNodes(solution.length);

    return (
        <Graph links={links} nodes={nodes}/>
    );
};

export {FixedNetworkAnimation, SimpleResponsiveNetworkGraph, ResponsiveNetworkAnimation};