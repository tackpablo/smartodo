require("dotenv").config();

// MOVIE API REQUEST - OTT MOVIE API - WORKS
const movieAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://ott-details.p.rapidapi.com/search?title=${encodedTextVal}&page=1`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "ott-details.p.rapidapi.com",
      "x-rapidapi-key": 'b950e81843msh0e1980f9199cef0p106192jsn269fba5269b5'
    }
  };

  $.ajax(settings).done(function (response) {
    return console.log("movieAPI length: ",response["results"].length);
  });
}

// BOOKS API REQUEST - HAPI BOOKS API - WORKS
const booksAPI = function(text) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://hapi-books.p.rapidapi.com/search/${encodedTextVal}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "hapi-books.p.rapidapi.com",
      "x-rapidapi-key": "b950e81843msh0e1980f9199cef0p106192jsn269fba5269b5"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log("booksAPI length: ", response.length);
  });
}

// BUYING API REQUEST - AMAZON API - WORKS
const buyAPI = function(text) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://amazon24.p.rapidapi.com/api/product?keyword=${encodedTextVal}&country=CA&page=1`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "amazon24.p.rapidapi.com",
      "x-rapidapi-key": 'b950e81843msh0e1980f9199cef0p106192jsn269fba5269b5'
    }
  };

    $.ajax(settings).done(function (response) {
      return console.log("buyAPI length: ", response.docs.length);
    });
}

// EATING API REQUEST - EDAMAM FOOD AND GROCERY DATABASE - WORKS
const eatAPI = function(text) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${encodedTextVal}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
      "x-rapidapi-key": "b950e81843msh0e1980f9199cef0p106192jsn269fba5269b5"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log("eatAPI length: ", response.hints.length);
  });
}

module.exports = {movieAPI, booksAPI, buyAPI, eatAPI}
