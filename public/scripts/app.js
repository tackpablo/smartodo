// Client facing scripts here

// create element to inject into index.ejs
const createTodo = function (todoData) {
  // Escape function that prevents cross script injections. Only used on data that is user submitted
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = `

`;
  return $tweet;
}
