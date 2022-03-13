// Client facing scripts here

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
        <a href="#">THINGS TO WATCH</a>
        <a href="#">PLACES TO EAT</a>
        <a href="#">BOOKS TO READ</a>
        <a href="#">THINGS TO BUY</a>
        <a href="#">MISCELLANEOUS</a>
        </div>
      </div>
      <button class="delete_btn">DELETE</button>
    </div>
  </div>
`;
  return $todo;
}

// function to append new tasks
const appendTodo = function (todo) {
  if (todo.category_id === 1) {
    $(".category1 .todolist").append(createTodo(todo));
  }

  if (todo.category_id === 2) {
    $(".category2 .todolist").append(createTodo(todo));
  }

  if (todo.category_id === 3) {
    $(".category3 .todolist").append(createTodo(todo));
  }

  if (todo.category_id === 4) {
    $(".category4 .todolist").append(createTodo(todo));
  }

  if (todo.category_id === 5) {
    $(".category5 .todolist").append(createTodo(todo));
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
    })
    .catch((error) => alert(error));
};

// Signals the DOM is ready for manipulation
$(document).ready(function () {

  loadTodos();

  // Form Submission Event Handler - prevent default of reloading page
  const $form = $("#add-task");
  $form.submit(function (event) {
    event.preventDefault();

    // Making request for posting information to database via AJAX request
    const data = $(this).serialize();
    $.ajax({ method: "POST", url: "/smartlist", data })
      .then((data) => {

        appendTodo(data.todo)

      })
      .catch((error) => alert(error));
  });
});
