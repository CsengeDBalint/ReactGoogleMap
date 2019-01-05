# NeighborhoodMap
[Udacity Front End Webdeveloper Nanodegree Program](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001) Project 8

## Table of Contents
  
* Project
* Dependencies
* File Structure
* Run the Project
* Online Demo
* Features
* Useful links

## Project

A single-page web application displaying a few classical cafés in the historic center of Vienna (Austria). The app is built with the React framework, Google Map Api and Foursquare Api.
Users can search by name from a list or on the map from the provided cafés.


## Dependencies 

 The project uses:
	[npm](https://www.npmjs.com/)
    [React](https://reactjs.org/)
    [Create React App](https://github.com/facebook/create-react-app)
    [Google Maps API](https://developers.google.com/maps/documentation/)

## File Structure
```sh
reactgooglemap
  node_modules/...
  public/
    favicon.ico
    index.html
    manifest.json
  src
    components/
      Footer.js
      Header.js
      logo.svg
      SidebarContainer.css
      SidebarContainer.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    serviceWorker.js
    
  .gitignore
  package.json
  package-lock.json
  README.md
  
```
  

## Run the Project

 1.  Clone or download this repository
 2.  `cd reactgooglemap` folder
 3.  Install all dependencies with `npm install` (in the root of this repository of your terminal)
 4.  Start the server with  `npm start`
 5.  Navigate to **localhost:3000** in your favorite browser

## Online Demo
Interact directly on GithubPages - in progress
[GithubPages] (https://github.com/CsengeDBalint/github.io/neighborhood_map)

## Features
 1.  The app starts with the first ten cafés in the altstadt of Vienna, which will be fetched by the [FourSquare Api] (https://foursquare.com/developers/explore).
 2.  You can select a café from the list by direct clicking and the marker of the café on the map will be animated.
 3.  For further information, please open the markers' infowindow.(You can close the infowindow by clicking the close icon.)
 4.  The other way to select a café is to type the name in the search bar.

 ## Useful Links

 + ["How to fetch data in React" blogpost by Robin Wieruch](https://www.robinwieruch.de/react-fetching-data/)
 + ["Road to React" - E-book] A concise and very good explained introduction to React also by Robin Wieruch] (https://roadtoreact.com/)
 + ["REACT LIFECYCLE EVENTS" blogpost by Flavio Copes](https://flaviocopes.com/react-lifecycle-events/)
 + ["Making a Progressive Web App"](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
