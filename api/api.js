require("dotenv").config();

// MOVIE API REQUEST - OTT MOVIE API - WORKS
const movieAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ott-details.p.rapidapi.com/search?title=Endgame&page=1",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "ott-details.p.rapidapi.com",
      "x-rapidapi-key": process.env.MOVIE_API_KEY
    }
  };

  $.ajax(settings).done(function (response) {
    return console.log(response);
  });
}

// BOOKS API REQUEST - GOOGLE BOOKS API - DOES NOT WORK
const booksAPI = function(text) {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://google-books.p.rapidapi.com/volumes?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "google-books.p.rapidapi.com",
		"x-rapidapi-key": `${process.env.BOOKS_API_KEY}`
	}
};

  $.ajax(settings).done(function (response) {
	  return console.log(response);
  });
}

// BUYING API REQUEST - AMAZON API - WORKS
const buyAPI = function(text) {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://amazon24.p.rapidapi.com/api/product?keyword=pineapple&country=CA&page=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "amazon24.p.rapidapi.com",
		"x-rapidapi-key": `${process.env.BUY_API_KEY}`
	}
};

  $.ajax(settings).done(function (response) {
	  return console.log(response);
  });
}

// EATING API REQUEST - YELP API - DOES NOT WORK
const eatAPI = function(text) {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yelp-com.p.rapidapi.com/search/nearby/${long}/${lat}?radius=10&term=Restaurants&offset=0",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yelp-com.p.rapidapi.com",
		"x-rapidapi-key": `${process.env.FOOD_API_KEY}`
	}
};

  $.ajax(settings).done(function (response) {
	  return console.log(response);
  });
}

module.exports = {movieAPI, booksAPI, buyAPI, eatAPI}
