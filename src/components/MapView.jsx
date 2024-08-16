import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import axios from 'axios';
import L from 'leaflet';
import './MapView.css'; 
import 'tailwindcss/tailwind.css'; 

const startIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'start-icon',
});

const endIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'end-icon',
});

const LocationSelector = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  return null;
};

const MapView = () => {
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); 

  const searchLocation = async (query) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      if (response.data.length > 0) {
        return [response.data[0].lat, response.data[0].lon];  
      }
      return null;
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  };

  const handleAddMarkers = async () => {
    const loc = await searchLocation(location);
    const dest = await searchLocation(destination);

    if (loc && dest) {
      const locMarker = {
        name: 'Start',
        position: loc.map(Number),
        popup: `Start at ${location}`,
      };
      const destMarker = {
        name: 'End',
        position: dest.map(Number),
        popup: `End at ${destination}`,
      };

      setMarkers([locMarker, destMarker]);
      setRefreshKey(prevKey => prevKey + 1); 
    } else {
      window.alert('One or both locations could not be found');
    }
  };

  const handleManualAddMarker = (latlng) => {
    if (markers.length < 2) {
      const newMarker = {
        name: markers.length === 0 ? 'Start' : 'End',
        position: [latlng.lat, latlng.lng],
        popup: markers.length === 0 ? 'Start Location' : 'End Location',
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    } else {
      window.alert('Only two markers are allowed. Please reset to add new markers.');
    }
  };

  const clearMarkers = () => {
    setMarkers([]);
    setRouteCoordinates([]);
    setDistance(null);
    setRefreshKey(prevKey => prevKey + 1); 
  };

  const handleStartMapping = async () => {
    if (markers.length === 2) {
      const A = markers[0].position;
      const B = markers[1].position;

      try {
        const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${A[1]},${A[0]};${B[1]},${B[0]}?overview=full&geometries=geojson`);
        const coordinates = response.data.routes[0].geometry.coordinates;
        const pathPositions = coordinates.map((coord) => [coord[1], coord[0]]);
        const routeDistance = response.data.routes[0].distance / 1000;

        setDistance(routeDistance.toFixed(2));
        setRouteCoordinates(pathPositions);
      } catch (error) {
        console.error('Error fetching route from OSRM:', error);
        window.alert('Error fetching route. Please try again.');
      }
    } else {
      window.alert('Please add exactly two markers to start mapping');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-teal-200 to-blue-300 min-h-screen gap-20">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-300 mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-teal-800">Dijkstra's Path Navigator</h1>
          <p className="text-lg text-gray-800">Plot two markers on the map to visualize the shortest path between them using Dijkstra’s algorithm.</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 items-center mt-6">
          <input 
            type="text" 
            placeholder="Enter current location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg mb-4 md:mb-0"
          />
          <input 
            type="text" 
            placeholder="Enter destination" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg mb-4 md:mb-0"
          />
          <button 
            onClick={handleAddMarkers} 
            className="bg-teal-700 text-white py-3 px-8 rounded-lg hover:bg-teal-800 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Add Markers
          </button>
        </div>
      </div>

      <MapContainer
        key={refreshKey} 
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '60vh', width: '90%' }}
        className="map mb-8 border border-gray-300 rounded-2xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={index === 0 ? startIcon : endIcon} 
          >
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="blue" weight={6} opacity={0.8} />
        )}
        <LocationSelector onLocationSelect={handleManualAddMarker} />
      </MapContainer>

      <div className="flex flex-col items-center mb-8 space-y-10">
        <button onClick={handleStartMapping} className="bg-teal-700 text-white py-3 px-8 rounded-lg hover:bg-teal-800 transition duration-300 shadow-lg transform hover:scale-105">
          Start Mapping
        </button>
        <button onClick={clearMarkers} className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105">
          Reset
        </button>
      </div>

      {distance && (
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-300 mx-auto">
        <div className="border border-gray-400 p-4 rounded-lg">
          <p className="text-center text-gray-800 text-2xl font-semibold">
            Route distance: {distance} km
          </p>
        </div>
      </div>
      )}
    </div>
  );
};

export default MapView;
