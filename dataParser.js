function addPoint(value) {
  const date = new Date();
  const timeMs = date.getTime();
  const explicitTime = new Date(timeMs).toLocaleString();

  let floatVal = parseFloat(value);
  addPointToChart(timeMs, floatVal);

  addPointToTable(explicitTime, floatVal);
  //data.push([explicitTime, value]);
}

function convertArrayToCSV() {
  let csv = "MS, Date, Hour, Value\n";
  const data = getDataFromChart();
  data.forEach((value, index, arr) => {
    csv +=
      value[0] +
      ", " +
      new Date(value[0]).toLocaleString() +
      ", " +
      value[1] +
      "\n";
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

function parseValueToHours(value, period) {
  if (period.includes("minute")) {
    return value / 60;
  }
  if (period.includes("hour")) {
    return value;
  }
  if (period.includes("day")) {
    return value * 24;
  }
}

function setMaxValueToPeriodToDisplayInput(period) {
  if (period.includes("minute")) {
    return 59;
  }
  if (period.includes("hour")) {
    return 23;
  }
  if (period.includes("day")) {
    return 30;
  }
}

function loadFile(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    file_data = event.target.result;
    setChartData(parseFileDataToArr(file_data));
  };
  reader.readAsText(file);
}
function parseFileDataToArr(file_data) {
  const lines = file_data.split("\n");
  const data = [];
  for (let i = 0; i < lines.length; i++) {
    line = lines[i].split(",");
    let x = parseInt(line[0]);
    let y = parseFloat(line[3]);
    data.push([x, y]);
  }
  return data;
}
