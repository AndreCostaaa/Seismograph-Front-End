const pointsArr = [];

function addPointToTable(time, value) {
  pointsArr.push([time, value]);
  if (pointsArr.length > 10) {
    pointsArr.shift();
  }
  printTable();
}
function printTable() {
  let element = document.getElementById("chart-X-Original-Table-Content");

  element.innerHTML = "";
  for (let i = pointsArr.length - 1; i >= 0; i--) {
    element.innerHTML += `<tr>
    <td align="center">${pointsArr[i][0]}</td>
    <td align="center">${pointsArr[i][1]}</td>
    </tr>`;
  }
}
function removePointFromTable() {
  let element = document.getElementById("chart-X-Original-Table-Content");

  element.innerHTML = newHtml;
}
