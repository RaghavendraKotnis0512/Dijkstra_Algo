import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapView = () => {
    const [markers, setMarkers] = useState([]);

    const AddMarker = () => {
        useMapEvents({
            click(e) {
                if (markers.length < 2) {
                    const newMarker = {
                        position: [e.latlng.lat, e.latlng.lng],
                        popup: `Marker at ${e.latlng.lat}, ${e.latlng.lng}`
                    };
                    setMarkers([...markers, newMarker]);
                } else {
                    window.alert("Cannot add more than two markers");
                }
                
            }
        });
        return null;
    };

    const clearMarkers = () => {
        setMarkers([]);
    };

    return (
        <div style={{ height: '90vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '90%', width: '80%', marginTop:'30px' }}
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
            </MapContainer>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <button
                    onClick={() => { /* Add your custom function here */ }}
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
