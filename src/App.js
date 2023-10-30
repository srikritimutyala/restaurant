import React, { useState, useEffect } from 'react';
import GoogleMap from './googleMaps';
import Finder from './restaurantFndr';
import axios from 'axios';
import Map from './Map';

function App() {
  
  const [restaurantNames, setRestaurantNames] = useState([]); // State to store the list of restaurant names

  const [clickedZIPCode, setClickedZIPCode] = useState(null);

  const handleZIPCodeReceived = (zipCode) => {
    setClickedZIPCode(zipCode);
    // Call your API with the ZIP code here
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!clickedZIPCode) {
        return;
      }

      const options = {
        method: 'GET',
        url: `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/${clickedZIPCode}/0`,
        headers: {
          'X-RapidAPI-Key': '7a77406592msh65d3b3cceb63bb1p1185d5jsn505678aff55e',
          'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const data = response.data;
        console.log(data.restaurants[0].restaurantName+"cnrekvbkireie")
        // Extract restaurant names from the API response using a for loop
        const restaurantData = [];
        for (let i = 0; i < data.restaurants.length; i++) {
          console.log(data.restaurants[i].restaurantName)
          restaurantData.push(data.restaurants[i].restaurantName)
        }
        console.log(restaurantData);

        setRestaurantNames(restaurantData); // Set the list of restaurant names in the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [clickedZIPCode]);

  return (
    <div className="App">
  <h1>My REAL App</h1>
  <Map onZIPCodeReceived={handleZIPCodeReceived} />
  {restaurantNames.length > 0 && (
    <div>
      <h2>Restaurants in ZIP Code {clickedZIPCode}</h2>
      <ul>
        {restaurantNames.map((restaurantName, index) => (
          <li key={index}>{restaurantName}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
}

export default App;
