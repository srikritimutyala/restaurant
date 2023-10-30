import React, { useState,Component } from "react";
import GoogleMapReact from "google-map-react";


const Marker = () => (
  <div
    style={{
      width: "20px",
      height: "20px",
      background: "blue",
      borderRadius: "50%",
    }}
  />
);

const markerProps = {
  lat: 40.7128,
  lng: -74.0060,
};


class GoogleMap extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // Array to store markers
    };
  }

  handleMapClick = (event) => {
    const { lat, lng } = event;
    const newMarker = { lat, lng };

    // Add the new marker to the state
    this.setState((prevState) => ({
      markers: [...prevState.markers, newMarker],
    }));
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);
   
  

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const zipCode = results[0].address_components.find((component) =>
          component.types.includes('postal_code')
        );
        if (zipCode) {
          const clickedZIPCode = zipCode.long_name;
          console.log('Clicked ZIP Code:', clickedZIPCode);
          
          // Call the handler function in the parent component
          this.props.onZIPCodeReceived(clickedZIPCode);
        } else {
          console.log('No ZIP code found for this location.');
        }
      } else {
        console.error('Geocoding request failed with status:', status);
      }
    });

    this.setState({
      clickedCoordinates: { lat, lng },
    });
  };

  render() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBZY0aCigoRFtHk8JMueWskR5E-21U4u7g",
          }}

          defaultCenter={{ lat:  41.99342528902854, lng:-88.0817527907852 }}
          defaultZoom={14}
          onClick={this.handleMapClick} // Attach the click event handler
        >

          {this.state.markers.map((marker, index) => (
            <Marker key={index} lat={marker.lat} lng={marker.lng} />
          ))}
          {/* {this.state.clickedCoordinates && (
            <Marker
              lat={41.99342528902854}
              lng={-88.0817527907852}
            />

          )} */}
        </GoogleMapReact>
        
      </div>
    );
  }
}



export default GoogleMap;
