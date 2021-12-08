function onLoad() {
  document
    .getElementById("Export-Button")
    .addEventListener("click", exportDataToCSV);

  document
    .getElementById("Connect-Button")
    .addEventListener("click", startMQTTClient);
  document
    .getElementById("PeriodToDisplayInput")
    .addEventListener("change", function () {});
}

window.onLoad = onLoad();
