// MOVIE API REQUEST
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://ott-details.p.rapidapi.com/search?title=Endgame&page=1",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "ott-details.p.rapidapi.com",
    "x-rapidapi-key": "b950e81843msh0e1980f9199cef0p106192jsn269fba5269b5"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

// BOOKS API REQUEST

// BUYING API REQUEST

// EATING API REQUEST
