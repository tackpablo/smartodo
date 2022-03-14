// Client facing scripts here

// geolocation
if ("geolocation" in navigator){ //check Geolocation available
	//things to do
}else{
	console.log("Geolocation not available!");
}

if ("geolocation" in navigator){ //check geolocation available
	//try to get user current location using getCurrentPosition() method
	navigator.geolocation.getCurrentPosition(function(position){
		// console.log("Found your location \nLat : "+position.coords.latitude+" \nLong :"+ position.coords.longitude);
		});
}else{
	console.log("Browser doesn't support geolocation!");
}

// create element to inject into index.ejs
const createTodo = function (todoData) {
  // Escape function that prevents cross script injections. Only used on data that is user submitted
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $todo = `
  <div class="todoitems" id="${todoData.id}">
    <p class="task-name">${escape(todoData.task)}</p>
    <div class="todo-options">
      <div class="dropdown">
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
          <a href=# class="to-watch">THINGS TO WATCH</a>
          <a href=# class="to-eat">PLACES TO EAT</a>
          <a href=# class="to-read">BOOKS TO READ</a>
          <a href=# class="to-buy">THINGS TO BUY</a>
          <a href=# class="miscellaneous">MISCELLANEOUS</a>
        </div>
      </div>
      <button class="delete_btn">Delete</button>
    </div>
  </div>
`;
  return $todo;
}

// function to append new tasks
const appendTodo = function (todo) {
  if (todo.category_id === 1) {
    $(".category1 .todolist").append(createTodo(todo));
    $("#task-text").val("");
  }

  if (todo.category_id === 2) {
    $(".category2 .todolist").append(createTodo(todo));
    $("#task-text").val("");
  }

  if (todo.category_id === 3) {
    $(".category3 .todolist").append(createTodo(todo));
    $("#task-text").val("");
  }

  if (todo.category_id === 4) {
    $(".category4 .todolist").append(createTodo(todo));
    $("#task-text").val("");
  }

  if (todo.category_id === 5) {
    $(".category5 .todolist").append(createTodo(todo));
    $("#task-text").val("");
  }
}

// for every task, append to correct category
const renderTodos = function (todos) {
  // empties the html of any appended tasks so that the new tasks can load
  $(".todolist").html("");

  todos.forEach((todo) => {
    appendTodo(todo)
  });
};

// Loads todos onto browser via AJAX request
const loadTodos = function () {
  $.ajax("/smartlist", {
    method: "GET",
    dataType: "json",
  })
    .then((result) => {
      renderTodos(result.todos);

      // delete functionality
      $(".delete_btn").on("click", function () {

        const itemId = $(this).parent().parent().attr("id")
        // console.log("itemId: ", itemId)

        $.ajax(`/smartlist/${itemId}`, {
          method: "DELETE",
          dataType: "json",
        })
          .then((result) => {
            // console.log("result", result)

            $("div").remove(`#${itemId}.todoitems`);

          });
      });

      // edit functionality
      $(".to-watch").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");
        $.ajax(`/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 1}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
            // console.log("result", result);
            location.reload();
          });
      });

      $(".to-eat").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");
        $.ajax(`/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 2}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
            // console.log("result", result);
            location.reload();
          });
      });

      $(".to-read").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");
        $.ajax(`/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 3}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
            // console.log("result", result);
            location.reload();
          });
      });

      $(".to-buy").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");
        $.ajax(`/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 4}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
            // console.log("result", result);
            location.reload();
          });
      });

      $(".miscellaneous").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");
        $.ajax(`/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 5}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
            // console.log("result", result);
            location.reload();
          });
      });

    })
    .catch((error) => alert(error));
};


// Signals the DOM is ready for manipulation
$(document).ready(function () {

  loadTodos();

  // Form Submission Event Handler - prevent default of reloading page
  const $form = $("#add-task");
  // addition of new tasks
  $form.submit(function (event) {
    event.preventDefault();

    let textVal = $('#task-text').val();
    let encodedTextVal = encodeURI(textVal)
    // console.log(textVal)
    // console.log(encodedTextVal)

// MOVIE API REQUEST - OTT MOVIE API - WORKS
const movieAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://ott-details.p.rapidapi.com/search?title=${task}&page=1`,
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
const booksAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://hapi-books.p.rapidapi.com/search/${task}`,
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
const buyAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://amazon24.p.rapidapi.com/api/product?keyword=${task}&country=CA&page=1`,
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
const eatAPI = function(task) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${task}`,
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

  Promise.allSettled([movieAPI(encodedTextVal), booksAPI(encodedTextVal), buyAPI(encodedTextVal), eatAPI(encodedTextVal)])

    // Making request for posting information to database via AJAX request
    const data = $(this).serialize();
    $.ajax({ method: "POST", url: "/smartlist", data })
      .then((data) => {

        loadTodos(appendTodo(data.todo));

      })
      .catch((error) => alert(error));
  });
});


