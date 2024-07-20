import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';
import 'leaflet-routing-machine';

const MapView = () => {
    const [markers, setMarkers] = useState([]);
    const [startRouting, setStartRouting] = useState(false);

    function Routing() {
        const map = useMap();

        React.useEffect(() => {
            if (!map || markers.length < 2) return;  // Ensure we have at least two markers for routing

            const routingControl = L.Routing.control({
                waypoints: markers.map(marker => L.latLng(marker.position[0], marker.position[1])),
                routeWhileDragging: false,
                createMarker: () => null, // Prevent adding default markers
            }).addTo(map);

            // Apply custom styles to the routing container
            const container = routingControl.getContainer();
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.flexWrap = 'wrap';
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            container.style.borderRadius = '10px';
            container.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            container.style.padding = '10px';
            container.style.maxHeight='200px'
            container.style.overflowY = 'auto';
            // Apply custom styles to the alternative routes
            const alts = container.querySelectorAll('.leaflet-routing-alt');
            alts.forEach(alt => {
                alt.style.color = '#007bff';
                alt.style.margin = '5px';
                alt.style.flex = '1 1 auto';
            });

            // Apply custom styles to the geocoders
            const geocoders = container.querySelectorAll('.leaflet-routing-geocoders');
            geocoders.forEach(geocoder => {
                geocoder.style.fontSize = '14px';
                geocoder.style.padding = '5px';
                geocoder.style.display = 'flex';
                geocoder.style.flexDirection = 'row';
                geocoder.style.flexWrap = 'wrap';
            });

            return () => map.removeControl(routingControl);
        }, [map]);  // Remove unnecessary dependencies

        return null;
    }

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
                    window.alert('Cannot add more than two markers');
                }
            }
        });
        return null;
    };

    const clearMarkers = () => {
        setMarkers([]);
        setStartRouting(false); // Reset routing state when clearing markers
    };

    const handleStartMapping = () => {
        if (markers.length === 2) {
            setStartRouting(true);
        } else {
            window.alert('Please add at least two markers to start mapping');
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
                {startRouting && <Routing />}
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