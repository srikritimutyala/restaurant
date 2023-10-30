// Map.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ onZIPCodeReceived }) => {
  const [markers, setMarkers] = useState([]);
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 42.036422, // Default center (New York City)
    lng: -88.062658,
  };

  const handleMapClick = (event) => {
    
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers([...markers, newMarker]);
    reverseGeocode(event.latLng, onZIPCodeReceived);
  };

  const reverseGeocode = (latLng, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const zipCode = results[0].address_components.find((component) =>
          component.types.includes('postal_code')
        );
        if (zipCode) {
          const clickedZIPCode = zipCode.long_name;
          console.log('Clicked ZIP Code:', clickedZIPCode);

          // Call the callback function in the parent component
          callback(clickedZIPCode);
        } else {
          console.log('No ZIP code found for this location.');
        }
      } else {
        console.error('Geocoding request failed with status:', status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBZY0aCigoRFtHk8JMueWskR5E-21U4u7g">
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={defaultCenter}
        zoom={10}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
