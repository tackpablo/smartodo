// External API requests using private keys

require("dotenv").config();
const axios = require("axios").default;

const APIKEY = process.env.API_KEY;

// MOVIE API REQUEST - ADVANCED MOVIE SEARCH API
const movieAPI = function(task) {
const options = {
  method: 'GET',
  url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
  params: {query: `${task}`, page: '1'},
  headers: {
    'x-rapidapi-host': 'advanced-movie-search.p.rapidapi.com',
    'x-rapidapi-key': APIKEY
  }
};

return axios.request(options).then(function (response) {
	let movieLength = response.data.results.length;
  return movieLength
}).catch(function (error) {
	console.error(error);
});
}

// BOOKS API REQUEST - HAPI BOOKS API
const booksAPI = function(task) {
  const  options = {
    method: 'GET',
    url: `https://hapi-books.p.rapidapi.com/search/${task}`,
    headers: {
      'x-rapidapi-host': 'hapi-books.p.rapidapi.com',
      'x-rapidapi-key': APIKEY
    }
  };

  return axios.request(options).then(function (response) {
    let booksLength = response.data.length;
    return booksLength;
  }).catch(function (error) {
    console.error(error);
  });
}

// EATING API REQUEST - EDAMAM FOOD AND GROCERY DATABASE
const eatAPI = function(task, long, lat) {
const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    params: {ingr: `${task}`},
    headers: {
      'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
      'x-rapidapi-key': APIKEY
    }
  };

  return axios.request(options).then(function (response) {
    let eatLength = response.data.hints.length;
    return eatLength;
  }).catch(function (error) {
    console.error(error);
  });

}

module.exports = {movieAPI, booksAPI, eatAPI}
