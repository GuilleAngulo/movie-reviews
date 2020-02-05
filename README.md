# 🧾 Excel prototype using React

This little component implements a data table, with the following funcionality:

- The headers and initial data can be uploaded at src/util/data.js
- Sorts the data alphabetically by clicking the headers of the table (An up arrow / down arrow will ilustrate it).
- Searching field at each header looking for an specific letter or word in order to filter the table data.
- Modify data by double clicking on cells. Press enter for save the new data.
- Can run two commands: ALT+SHIFT+R for a replay of all steps made (all previous React state) and ALT+Z for back to the previous React state.
- Exports the modified file into a CSV | JSON.

<img src="https://github.com/GuilleAngulo/excel-react/blob/master/react-excel.png" width="900">
