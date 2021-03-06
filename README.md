﻿# MyReads 
This is MyReads Project developed by PONG VEE YIK @ Udacity React Programme.

## How to launch the project
### Installation
You'll need to install the following libraries using npm install:
```js
npm install -g create-react-app
npm install --save prop-types
npm install --save react-router-dom
```
### Setup and Clone project
1. Open terminal, navigate to an empty folder and create myreads app using the follow command:
```js 
create-react-app myreads
```
*Wait for installation*

2. Go into the 'myreads' folder on your terminal

3. Clone the project from this repository (https://github.com/Veeyikpong/myreads.git), using the following instructions:
```js
git init
git remote add origin https://github.com/Veeyikpong/myreads.git
git fetch
git checkout origin/master -ft
```

### Start project 
1. Navigate to myreads folder in terminal

2. Start the project with the following command:
```js 
npm start 
```

## Project Specifications
### Main Page

✓ 3 Shelves for books, 'Currently Reading', 'Want to Read', and 'Read'

✓ Books can be moved between shelves. The control is tied to each book instance

✓ When the browser / page is refreshed, same information is displayed

✓ Contains a button (Floating add button) to link to search page 

✓ Loading screen is shown during initialization / book update Loading screen is shown during initialization / book update

✓ Click on the book will navigate to a preview link

### Search page
✓ User can type into the search field, books that match the query are displayed on the page

✓ A spinner will be shown during the searching process at the end of the search bar

✓ Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

✓ When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.

✓ Contains a back button (in the search bar) for user to navigate back to main page 

✓ If no book can be found, 'No record found' will be displayed

✓ Click on the book will navigate to a preview link

## Project files
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── App.js # This is the root the app, controlling the main page, search page, api calls, state and all the child components.
    ├── ListBooks.js # Rendering main page, containing 3 shelves.
    ├── Shelf.js # Rendering shelf component to display list of books in this shelf. Used in main page (ListBook.js)
    ├── SearchBooks.js # Rendering search book page.
    ├── Footer.js # Rendering personalized footer element.
    ├── App.css # Styles for the app.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
