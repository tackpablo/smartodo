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
  <div class="todoitems">
      <p class="task-name">${(todoData)}</p>
      <div class="todo-options">
      <div class="dropdown">
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
        <a href="#">${(todoData)}</a>
        <a href="#">${(todoData)}</a>
        <a href="#">${(todoData)}</a>
        <a href="#">${(todoData)}</a>
        <a href="#">${(todoData)}</a>
        </div>
      </div>
        <form id="delete-task" action="/smartlist/:id/delete" method="POST">
        <button type="submit">DELETE</button>
      </div>
    </div>
`;
  return $todo;
}


const renderTodos = function ($todos) {
  // empties the html of any appended tweets so that the new tweets can load
  $(".category1").empty();
  console.log($todos)

  $todos.forEach((todo) => {
    $(".category1").append(createTodo(todo)); // prepended to post newest first
  });
};

// Loads todos onto browser via AJAX request
const loadTodos = function () {
  $.ajax("/smartlist", {
    method: "GET",
    dataType: "json",
  })
    .then((result) => {
      renderTodos(result);
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
    $.ajax({ method: "POST", url: "/smartlist", data })
      .then(() => {

        loadTodos();
      })
      .catch((error) => alert(error));
  });
});
