# Smartodo Project

Smartodo is a full stack to do list application that is able to categorize added tasks. It was made using EJS, sass, JS, jQuery/AJAX, Axios, Node.js and postgreSQL. External APIs used were: Advanced Movie Search API, HAPI Books API and the Edamam Food and Frocery Database API. Midterm project for Lighthouse Labs Midterm

# How to use Smartodo and Features

- Minimalistic design
- MPA utilizing AJAX requests to prevent page refreshes when possible
- Navigation bar to navigate between landing page, login/register page, and task list page.
- Functional login and registration
- Error handling for empty inputs as well
- Responsive design that supports different screen sizes
- Protected against simple XSS injection for safe use
- Ability to add tasks, which gets sorted via sorting algorithm to correct category (4 total categories)
- Task categories are editable
- Tasks can be deleted
- Main task list page has dynamic message based on time and displays user first name

# Final Product

### Desktop View

!["Desktop View"]()

### Mobile View

!["Mobile View"]()

# Features

### Landing Page

!["Landing Page"]()

### Login Page

!["Login Page"]()

### Register Page

!["Register Page"]()

### Add Task Page

!["Add Task Page"]()

### Edit Task Page

!["Edit Task Page"]()

### Delete Task Page

!["Delete Task Page"]()

# Errors

### Empty Inputs

!["Empty Inputs"]()

# Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

# Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Axios
- body-parser
- chalk
- cookie-parser
- EJS
- express
- morgan
- pg
- sass

# Contributions

## My Contributions

- All database tables and seeds setup, queries on server side
- Overall page routing between server and client side (logic, data movement/manipulation, and implementation)
  - Includes login and register functionalities, persisting cookie data
- Axios implementation to move external API calls to server side (initially set up client side)
- Find sources for all external APIs
- Views setup and styling for all rendered pages - landing page, forms, partials header, etc
  - Includes most styling (such as bouncing nav bar items and spinner modal) as well as functionality for all requests from these pages
- Site functionality: addition of new tasks, deletion, login/logout, registration and correct database manipulation to allow for these functions
- All site links for ease of navigation
- Separate all styles into separate files
- Consistently refactor code
- Do code clean up
- Make site mobile responsive

## [Partner Yuki Fujiwara's](https://github.com/shiawase7) Contributions

- Styling/initial text Input button
- Editing feature for the drop down buttons implementation
- Welcome message dependant on time, dynamic user specific message
- Refactored logic and containers to not include miscellaneous as a category, as well as removing the AmazonAPI to improve performance and logic
- Involved in pair programming and discussing logic/implementation/debugging for several other features
- Set up cookies for login
- Font styling, container adjustments
- Refactoring logic to exclude keywords
