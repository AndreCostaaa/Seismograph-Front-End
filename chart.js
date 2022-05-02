const T = 1 / 0.25;
let chartAllAll = null;
let hours_to_display = 1;

function onLoad() {
  Highcharts.setOptions({
    global: {
      useUTC: false,
    },
  });

  chartAll = new Highcharts.Chart({
    chart: {
      renderTo: document.getElementById("chart-All"),
    },
    title: {
      text: "",
    },
    series: [
      {
        showInLegend: false,
        data: [],
      },
      {
        showInLegend: false,
        data: [],
      },
    ],
    plotOptions: {
      line: { animation: false, dataLabels: { enabled: true } },
      series: { color: "#059e8a", color: "#ff0000" },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      max: 200,
      min: -200,
    },
    credits: { enabled: false },
    plotOptions: {
      enabled: false,
    },
  });
  chartXOriginal = new Highcharts.Chart({
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
      max: 50,
      min: -50,
    },
    credits: { enabled: false },
    plotOptions: {
      enabled: false,
    },
  });
  chartXMultiplied = new Highcharts.Chart({
    chart: {
      renderTo: document.getElementById("chart-X-Multiplied"),
    },
    title: {
      text: "X Axis - Multiplied",
    },
    series: [
      {
        showInLegend: false,
        data: [],
      },
      {
        showInLegend: false,
        data: [],
      },
    ],
    plotOptions: {
      line: { animation: false, dataLabels: { enabled: true } },
      series: { color: "#ff0000" },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      max: 100,
      min: -100,
    },
    credits: { enabled: false },
    plotOptions: {
      enabled: false,
    },
  });
}

function addPointToChart(idx, x, y) {
  let chart = null;

  switch (idx) {
    case 0:
      chart = chartXOriginal;
      break;
    case 1:
      chart = chartXMultiplied;
      break;
    default:
      break;
  }
  if (chartAll.series[idx].data.length > hours_to_display * T * 3600) {
    chartAll.series[idx].addPoint([x, y], true, true, true);
    chart.series[0].addPoint([x, y], true, true, true);
  } else {
    chartAll.series[idx].addPoint([x, y], true, false, true);
    chart.series[0].addPoint([x, y], true, false, true);
  }

  if (idx === 0) {
    chartXOriginal.series[0].addPoint([x, y, true, true, true]);
  }
}

function getDataFromChart() {
  const data = [];
  for (let i = 0; i < chartAll.series[0].data.length; i++) {
    data.push([
      chartAll.series[0].xData[i],
      chartAll.series[0].yData[i],
      chartAll.series[1].yData[i],
    ]);
  }
  return data;
}

function setChartData(data) {
  chartAll.series[0].setData(data);
}

function setChartDisplayTime(value) {
  hours_to_display = value;
  updateChart(value);
}
function updateChart(new_value) {
  /*
  //calculate the number of points we should have
  let new_max_points = new_value * T * 3600;
  if (chartAll.series[0].data.length > new_max_points) {
    //remove all the extra points. no animation
    while (chartAll.series[0].data.length > new_max_points - 1) {
      chartAll.series[0].data[0].remove(false);
    }
    //add animation to last removal
    chartAll.series[0].data[0].remove(true);
  }*/
  const timeNow = new Date().getTime();
  let timeStart = timeNow - new_value * 3600 * 1000;

  while (chartAll.series[0].data.length > 0) {
    if (
      timeStart > chartAll.series[0].data[0].x ||
      isNaN(chartAll.series[0].data[0].x)
    ) {
      chartAll.series[0].data[0].remove(true);
    } else {
      break;
    }
  }
}

window.onload = onLoad();
