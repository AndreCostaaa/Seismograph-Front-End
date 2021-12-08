function onLoad() {}

function addPointToTable(time, value) {
  let newPoint = `<tr>
    <td align="center">${time}</td>
    <td align="center">${value}</td>
</tr>`;
  let element = document.getElementById("chart-X-Original-Table-Content");

  let newHtml = newPoint + element.innerHTML;
  element.innerHTML = newHtml;
}

window.onLoad = onLoad();
