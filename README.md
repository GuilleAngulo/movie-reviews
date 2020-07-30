# 📽️ Movie Reviews

This component implements a data table, with the following funcionality:

- The headers and initial data can be uploaded at src/util/schema.js
- Sorts the data alphabetically by clicking the headers of the table (An up/down arrow will ilustrate it).
- A searching field looking for an specific letter or word in order to filter the table data.
- Modify data by double clicking on cells. Press enter for save the new data.
- Each row can be: displayed, edited or removed using the actions column.
- It is possible to switch between light and dark theme (night mode), using the switch at the top-right corner.

### Styled Components 💅
The app uses styled components to have 'ThemeProvider' feature in order to switch styles between themes.

### Flux Pattern
It is implemented the flux pattern at 'flux' folder. The store is at 'CRUDStore' and actions are declared at 'CRUDActions'. At the store an EventEmitter is initialized, and everytime the app data is set an event is emitted to the components subscribed to have a data update. In this app the data is stored at localStorage in the browser. This makes the things much easier in order to comunicate the data updates between components.

## 🎞️ Live Demo
You can test it [here](https://reviews.guilleangulo.me)

## 📸 Screens

<img src="https://github.com/GuilleAngulo/movie-reviews/blob/master/img/light-theme.png" width="420"> <img src="https://github.com/GuilleAngulo/movie-reviews/blob/master/img/light-edit.png" width="420">
<img src="https://github.com/GuilleAngulo/movie-reviews/blob/master/img/dark-theme.png" width="420"> <img src="https://github.com/GuilleAngulo/movie-reviews/blob/master/img/add-dark.png" width="420">

## 🎥 Video Demo
[![Watch the demo](https://github.com/GuilleAngulo/movie-reviews/blob/master/img/github-youtube.png)](https://www.youtube.com/watch?v=PAjQd3ibD4Y)
