import React from 'react'
import ReactDOM from 'react-dom/client'
// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.js'
import './index.css'

import 'notyf/notyf.min.css';

/*
createRoot - assigns the element to be managed by React with its Virtual DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
render() - displays the react elements/components into the root.
App component is our mother component, this is the component we use as entry point and where we can render all other components or pages.
<React.StrictMode> - component from React that manages future or possible conflicts. It allows us extend or expand certain error messages.
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// // variable to the name to be displayed in the page
// const name = 'John Smith';

// const user = {
//   firstName: 'Jane',
//   lastName: 'Smith'
// }

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }

// // JSX element that utilizes html and javascript to properly load html elements and javascript code together
// const element = <h1>Hello, {formatName(user)}</h1>

// // root variable created to select the root element found in the index.html file
// const root = ReactDOM.createRoot(document.getElementById('root'));

// // renders the JSX element created in the "element" variable in the root element from the index.html
// root.render(element);