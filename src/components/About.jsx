import React from 'react';

const About = () => {
    return (
        <div style={{
            padding: '20px',
            maxWidth: '900px',
            margin: 'auto',
            fontFamily: '"Arial", sans-serif',
            lineHeight: '1.6',
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                color: '#333',
                marginBottom: '20px',
                textAlign: 'center',
            }}>About Dijkstra's Path Navigator</h1>
            <p style={{
                fontSize: '1.2rem',
                color: '#555',
                marginBottom: '20px',
            }}>
                Dijkstra's Path Navigator is an advanced application designed to simplify navigation and find the shortest path between two locations using Dijkstra's algorithm. This powerful tool is ideal for both personal use and professional applications, providing a clear and efficient way to plan routes in complex networks.
            </p>

            <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    color: '#333',
                    marginBottom: '10px',
                }}>Project Overview</h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '20px',
                }}>
                    The primary goal of Dijkstra's Path Navigator is to offer an intuitive and interactive solution for pathfinding problems. By leveraging Dijkstra's algorithm, we ensure that users receive the shortest possible path between any two points on a map.
                </p>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '20px',
                }}>
                    Our application is designed to be user-friendly, with an emphasis on clarity and ease of use. The interactive map allows users to visually explore routes and see real-time updates as they adjust their input.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    color: '#333',
                    marginBottom: '10px',
                }}>Features</h2>
                <ul style={{
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    marginBottom: '20px',
                }}>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Real-time pathfinding with Dijkstra's algorithm</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Interactive and zoomable map interface</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Customizable start and end points for route planning</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Detailed route information and distance calculation</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>User-friendly design with clear visualizations</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Support for various map layers and settings</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Optimized for performance and accuracy</li>
                </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    color: '#333',
                    marginBottom: '10px',
                }}>How It Works</h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '20px',
                }}>
                    Dijkstra's Path Navigator utilizes Dijkstra's algorithm to calculate the shortest path between two points. The algorithm works by progressively exploring the nearest unvisited nodes and updating the shortest known distances. The process continues until the shortest path is found for all nodes.
                </p>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '20px',
                }}>
                    Here’s a simplified overview of the algorithm:
                </p>
                <ol style={{
                    paddingLeft: '20px',
                    marginBottom: '20px',
                }}>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Initialize the distance to the start node as 0 and all other nodes as infinity.</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Add the start node to a priority queue with a distance of 0.</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>While the queue is not empty, extract the node with the smallest distance.</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Update the distances to its neighbors if a shorter path is found.</li>
                    <li style={{
                        fontSize: '1.2rem',
                        color: '#555',
                    }}>Repeat until all nodes have been visited and the shortest paths are determined.</li>
                </ol>
            </section>
            
        </div>
    );
};

export default About;
