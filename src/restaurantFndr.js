const axios = require('axios');

const finder = async () =>{


    const options = {
        method: 'GET',
        url: 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/${zipCode}/90210/0',
        headers: {
          'X-RapidAPI-Key': 'afc51d6a85msh5e9a7cb59a0e9efp17ed46jsn9053bb58c80d',
          'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
      
      

}

