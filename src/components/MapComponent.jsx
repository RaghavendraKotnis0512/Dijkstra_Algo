import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(data, priority) {
        this.nodes.push({ data, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift().data;
    }

    isEmpty() {
        return !this.nodes.length;
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }
}

const dijkstra = (graph, startNode, endNode) => {
    const distances = {};
    const previousNodes = {};
    const pq = new PriorityQueue();
    const nodes = Object.keys(graph);

    nodes.forEach(node => {
        distances[node] = node === startNode ? 0 : Infinity;
        previousNodes[node] = null;
        pq.enqueue(node, distances[node]);
    });

    while (!pq.isEmpty()) {
        const currentNode = pq.dequeue();

        if (currentNode === endNode) {
            const path = [];
            let n = endNode;
            while (n !== null) {
                path.unshift(n);
                n = previousNodes[n];
            }
            return path;
        }

        if (distances[currentNode] === Infinity) continue;

        Object.entries(graph[currentNode]).forEach(([neighbor, weight]) => {
            const alt = distances[currentNode] + weight;
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previousNodes[neighbor] = currentNode;
                pq.enqueue(neighbor, alt);
            }
        });
    }

    return [];
};

const MapView = () => {
    const [markers, setMarkers] = useState([]);
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);

    const AddMarker = () => {
        useMapEvents({
            click(e) {
                if (markers.length < 2) {
                    const newMarker = {
                        name: `Marker${markers.length + 1}`, 
                        position: [e.latlng.lat, e.latlng.lng],
                        popup: `Marker at ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`
                    };
                    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
                } else {
                    window.alert('Cannot add more than two markers');
                }
            }
        });
        return null;
    };

    const clearMarkers = () => {
        setMarkers([]);
        setRoute([]);
        setDistance(null);
    };

    const handleStartMapping = async () => {
        if (markers.length === 2) {
            const A = markers[0].position;
            const B = markers[1].position;

            try {
                const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${A[1]},${A[0]};${B[1]},${B[0]}?overview=full&geometries=geojson`);
                const coordinates = response.data.routes[0].geometry.coordinates;
                const pathPositions = coordinates.map(coord => [coord[1], coord[0]]);
                const routeDistance = response.data.routes[0].distance / 1000; 

                setRoute(pathPositions);
                setDistance(routeDistance.toFixed(2)); 
            } catch (error) {
                console.error('Error fetching route from OSRM:', error);
                window.alert('Error fetching route. Please try again.');
            }
        } else {
            window.alert('Please add exactly two markers to start mapping');
        }
    };

    return (
        <div style={{ height: '90vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '90%', width: '80%', marginTop: '30px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <AddMarker />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))}
                {route.length > 0 && (
                    <Polyline positions={route} color="blue" />
                )}
            </MapContainer>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <button
                    onClick={handleStartMapping}
                    style={buttonStyles}
                >
                    Start mapping
                </button>
                <button
                    onClick={clearMarkers}
                    style={buttonStyles}
                >
                    Reset
                </button>
            </div>
            {distance && (
                <div style={{ marginTop: '10px' }}>
                    <p>Shortest path distance: {distance} km</p>
                </div>
            )}
        </div>
    );
};

const buttonStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

export default MapView;








