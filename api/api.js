require("dotenv").config();
const axios = require("axios").default;

const APIKEY = process.env.API_KEY;

// MOVIE API REQUEST - ADVANCED MOVIE SEARCH API - WORKS
const movieAPI = function(task) {
  // const settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": `https://advanced-movie-search.p.rapidapi.com/search/movie?query=${task}&page=1`,
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
  //     "x-rapidapi-key": APIKEY
  //   }
  // };

  // return $.ajax(settings).then(function (response) {
  //   let movieLength = response.results.length;
  //   console.log("movieAPI length: ", response.results.length);
  //   return movieLength;
  // });

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
  console.log("movieAPI length: ", movieLength);
  return movieLength
}).catch(function (error) {
	console.error(error);
});
}

// BOOKS API REQUEST - HAPI BOOKS API - WORKS
const booksAPI = function(task) {
  // const settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": `https://hapi-books.p.rapidapi.com/search/${task}`,
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "hapi-books.p.rapidapi.com",
  //     "x-rapidapi-key": APIKEY
  //   }
  // };

  // return $.ajax(settings).then(function (response) {
  //   let booksLength = response.length;
  //   console.log("booksAPI length: ", response.length);
  //   return booksLength;
  // })

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
    console.log("booksAPI length: ", booksLength);
    return booksLength;
  }).catch(function (error) {
    console.error(error);
  });
}

// BUYING API REQUEST - AMAZON API - WORKS
const buyAPI = function(task) {
  // const settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": `https://amazon24.p.rapidapi.com/api/product?keyword=${task}&country=CA&page=1`,
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "amazon24.p.rapidapi.com",
  //     "x-rapidapi-key": APIKEY
  //   }
  // };

  // return $.ajax(settings).then(function (response) {
  //     let buyLength = response.docs.length;
  //     console.log("buyAPI length: ", response.docs.length);
  //     return buyLength;
  // })
};

// EATING API REQUEST - EDAMAM FOOD AND GROCERY DATABASE - WORKS
const eatAPI = function(task) {
  // const settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${task}`,
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
  //     "x-rapidapi-key": APIKEY
  //   }
  // };

  // return $.ajax(settings).then(function (response) {
  //     let eatLength = response.hints.length;
  //     console.log("eatAPI length: ", response.hints.length);
  //     return (eatLength);
  // })

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
    console.log("eatAPI length: ", eatLength);
    return eatLength;
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = {movieAPI, booksAPI, buyAPI, eatAPI}
