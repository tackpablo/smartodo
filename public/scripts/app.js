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

// function to render all tasks
const renderTodos = function (todos) {
  // empties the html of any appended tasks so that the new tasks can load
  $(".todolist").html("");

  todos.forEach((todo) => {
    appendTodo(todo)
  });
};

// function to load tasks to DOM
const loadTodos = function () {

  // API request to retrieve data from DB
  $.ajax("/api/smartlist", {
    method: "GET",
    dataType: "json",
  })
    .then((result) => {
      renderTodos(result.todos);

      // delete functionality
      $(".delete_btn").on("click", function () {

        const itemId = $(this).parent().parent().attr("id")

        // API request to remove data from DB
        $.ajax(`/api/smartlist/${itemId}`, {
          method: "DELETE",
          dataType: "json",
        })
          .then((result) => {
            $("div").remove(`#${itemId}.todoitems`);
          });
      });

      // edit functionality via on click
      $(".to-watch").on("click", function () {
        const $todoDiv = $(this).parent().parent().parent().parent();
        const itemId = $todoDiv.attr("id");

        // API requests to edit data from DB
        $.ajax(`/api/smartlist/${itemId}`, {
          method: "PUT",
          data: JSON.stringify({category_id: 1}),
          dataType: "json",
          contentType: 'application/json'
        })
          .then((result) => {
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
            location.reload();
          });
      });
    })
};


// function for time related message upon login
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



// modal class addition/removal
$body = $("body");

$(document).on({
  ajaxStart: function() { $body.addClass("loading"); },
  ajaxStop: function() { $body.removeClass("loading"); }
});

loadTodos();
timeMessage();
setInterval(timeMessage, 1000);

  // form submission event handler
  const $form = $("#add-task");
  $form.submit(function (event) {
    event.preventDefault();

    let textVal = $('#task-text').val();
    let encodedTextVal = encodeURI(textVal);

    // error handling for when input text is empty
    if (textVal === undefined || textVal === "") {
      return;
    }

    // API request to add data from DB
    $.ajax({ method: "POST", url: "/api/smartlist", data: {
      textVal,
      encodedTextVal,
    }})
    .catch((error) => alert(error))
      .then((data) => {
        loadTodos(appendTodo(data.todo));
      })
      .catch((error) => alert(error));
    });
});


