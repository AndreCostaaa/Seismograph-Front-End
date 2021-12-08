const data = [];

function addPoint(value) {
  const date = new Date();
  const timeMs = date.getTime() + 3600000;
  const explicitTime = new Date(timeMs).toLocaleString();

  let floatVal = parseFloat(value);
  addPointToChart(timeMs, floatVal);
  addPointToTable(explicitTime, floatVal);
  data.push([explicitTime, value]);
}

function convertArrayToCSV() {
  let csv = "Date, Hour, Value\n";

  data.forEach((value, index, arr) => {
    csv += value[0] + ", " + value[1] + "\n";
  });
  return csv;
}
function createAndDownloadFile(csv) {
  let downloadLink = document.createElement("a");
  let blob = new Blob(["\ufeff", csv]);
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "dataSismographe.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function exportDataToCSV() {
  csv = convertArrayToCSV();
  createAndDownloadFile(csv);
}
