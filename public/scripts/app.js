// Client facing scripts here

// Signals the DOM is ready for manipulation
$(document).ready(function () {

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
        <button class="dropbtn btn_style">Categories</button>
        <div class="dropdown-content">
          <a href=# class="to-watch">THINGS TO WATCH</a>
          <a href=# class="to-eat">PLACES TO EAT</a>
          <a href=# class="to-read">BOOKS TO READ</a>
          <a href=# class="to-buy">THINGS TO BUY</a>
        </div>
      </div>
      <button class="delete_btn btn_style">Delete</button>
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
  $.ajax("/api/smartlist", {
    method: "GET",
    dataType: "json",
  })
    .then((result) => {
      renderTodos(result.todos);

      // delete functionality
      $(".delete_btn").on("click", function () {

        const itemId = $(this).parent().parent().attr("id")
        // console.log("itemId: ", itemId)

        $.ajax(`/api/smartlist/${itemId}`, {
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
        $.ajax(`/api/smartlist/${itemId}`, {
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
        $.ajax(`/api/smartlist/${itemId}`, {
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
        $.ajax(`/api/smartlist/${itemId}`, {
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
        $.ajax(`/api/smartlist/${itemId}`, {
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
    })
    // .catch((error) => );
};


//time-related message
function timeMessage() {
  var date = new Date();
  var hr = date.getHours();
  if (hr < 12)
	 {
        greet = 'Good Morning';
		format='AM';
		}
    else if (hr >= 12 && hr <= 17)
	{
        greet = 'Good Afternoon';
		format='PM';
		}
    else if (hr >= 17 && hr <= 24)
        greet = 'Good Evening';
  $('.time-msg').text(greet)
}


loadTodos();

// modal
$body = $("body");

$(document).on({
  ajaxStart: function() { $body.addClass("loading");    },
  ajaxStop: function() { $body.removeClass("loading"); }
});

 //time-dependent-msg
 timeMessage();
 setInterval(timeMessage, 1000);

  // Form Submission Event Handler - prevent default of reloading page
  const $form = $("#add-task");
  // addition of new tasks
  $form.submit(function (event) {
    event.preventDefault();

    let textVal = $('#task-text').val();
    let encodedTextVal = encodeURI(textVal);
    console.log("textVal: ", textVal)
    console.log("encodedTextVal: ", encodedTextVal)

    // error handling for when we get nothing as an entry
    if (textVal === undefined || textVal === "") {
      return;
    }

// // MOVIE API REQUEST - ADVANCED MOVIE SEARCH API - WORKS
// const movieAPI = function(task) {
//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://advanced-movie-search.p.rapidapi.com/search/movie?query=${task}&page=1`,
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
//       "x-rapidapi-key": "9637cc0574mshada86068be2ce37p1b4b95jsn79c0b67f1b98"
//     }
//   };

//   return $.ajax(settings).then(function (response) {
//     let movieLength = response.results.length;
//     console.log("movieAPI length: ", response.results.length);
//     return movieLength;
//   });
// }

// // BOOKS API REQUEST - HAPI BOOKS API - WORKS
// const booksAPI = function(task) {
//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://hapi-books.p.rapidapi.com/search/${task}`,
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "hapi-books.p.rapidapi.com",
//       "x-rapidapi-key": "9637cc0574mshada86068be2ce37p1b4b95jsn79c0b67f1b98"
//     }
//   };

//   return $.ajax(settings).then(function (response) {
//     let booksLength = response.length;
//     console.log("booksAPI length: ", response.length);
//     return booksLength;
//   })
// }


// // EATING API REQUEST - EDAMAM FOOD AND GROCERY DATABASE - WORKS
// const eatAPI = function(task) {
//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${task}`,
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
//       "x-rapidapi-key": "9637cc0574mshada86068be2ce37p1b4b95jsn79c0b67f1b98"
//     }
//   };

//   return $.ajax(settings).then(function (response) {
//       let eatLength = response.hints.length;
//       console.log("eatAPI length: ", response.hints.length);
//       return (eatLength);
//   })
// }

  // Promise.allSettled([movieAPI(encodedTextVal), eatAPI(encodedTextVal), booksAPI(encodedTextVal)]).then((apiResult) => {
  //   console.log("apiResult", apiResult)

    // Making request for posting information to database via AJAX request
    $.ajax({ method: "POST", url: "/api/smartlist", data: {
      textVal,
      encodedTextVal
    }})
    .catch((error) => alert(error))
      .then((data) => {
        // console.log("TODO DATA: ", data.todo)
        loadTodos(appendTodo(data.todo));

      })
      .catch((error) => alert(error));
    });
  // })
});


