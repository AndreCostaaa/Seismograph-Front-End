const T = 1 / 0.25;
let chartT = null;
let hours_to_display = 1;

function onLoad() {
  Highcharts.setOptions({
    global: {
      useUTC: false,
    },
  });

  chartT = new Highcharts.Chart({
    chart: {
      renderTo: document.getElementById("chart-X-Original"),
    },
    title: {
      text: "X Axis - Original",
    },
    series: [
      {
        showInLegend: false,
        data: [],
      },
    ],
    plotOptions: {
      line: { animation: false, dataLabels: { enabled: true } },
      series: { color: "#059e8a" },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      max: 80,
      min: -80,
    },
    credits: { enabled: false },
    plotOptions: {
      enabled: false,
    },
  });
}

function addPointToChart(x, y) {
  if (chartT.series[0].data.length > hours_to_display * T * 3600) {
    chartT.series[0].addPoint([x, y], true, true, true);
  } else {
    chartT.series[0].addPoint([x, y], true, false, true);
  }
}

function getDataFromChart() {
  const data = [];
  for (let i = 0; i < chartT.series[0].data.length; i++) {
    data.push([chartT.series[0].xData[i], chartT.series[0].yData[i]]);
  }
  return data;
}

function setChartData(data) {
  chartT.series[0].setData(data);
}

function setChartDisplayTime(value) {
  hours_to_display = value;
  updateChart(value);
}
function updateChart(new_value) {
  /*
  //calculate the number of points we should have
  let new_max_points = new_value * T * 3600;
  if (chartT.series[0].data.length > new_max_points) {
    //remove all the extra points. no animation
    while (chartT.series[0].data.length > new_max_points - 1) {
      chartT.series[0].data[0].remove(false);
    }
    //add animation to last removal
    chartT.series[0].data[0].remove(true);
  }*/
  const timeNow = new Date().getTime();
  let timeStart = timeNow - new_value * 3600 * 1000;

  while (chartT.series[0].data.length > 0) {
    if (
      timeStart > chartT.series[0].data[0].x ||
      isNaN(chartT.series[0].data[0].x)
    ) {
      chartT.series[0].data[0].remove(true);
    } else {
      break;
    }
  }
}

window.onload = onLoad();
