const HOURS_TO_DISPLAY = 1;
const T = 1 / 0.25;
let chartT = null;

function onLoad() {
  chartT = new Highcharts.Chart({
    chart: { renderTo: document.getElementById("chart-X-Original") },
    title: { text: "X Axis - Original" },
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
    xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M:%S" } },
    yAxis: {
      max: 0.08,
      min: -0.08,
    },
    credits: { enabled: false },
    plotOptions: {
      enabled: false,
    },
  });
}

function addPointToChart(x, y) {
  if (chartT.series[0].data.length > HOURS_TO_DISPLAY * T * 3600) {
    chartT.series[0].addPoint([x, y], true, true, true);
  } else {
    chartT.series[0].addPoint([x, y], true, false, true);
  }
}

window.onload = onLoad();
