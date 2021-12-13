function onLoad() {
  document
    .getElementById("Export-Button")
    .addEventListener("click", exportDataToCSV);

  document
    .getElementById("Connect-Button")
    .addEventListener("click", startMQTTClient);
  document
    .getElementById("PeriodToDisplayInput")
    .addEventListener("change", function () {
      const periodInputElement = document.getElementById("PeriodInput");
      if (periodInputElement.value) {
        setChartDisplayTime(
          parseValueToHours(
            this.value,
            document.getElementById("PeriodInput").value
          )
        );
      } else {
        periodInputElement.style.borderColor = "#FF0000";
        console.log("set color");
      }
    });
  document
    .getElementById("PeriodInput")
    .addEventListener("change", function () {
      setChartDisplayTime(
        parseValueToHours(
          document.getElementById("PeriodToDisplayInput").value,
          this.value
        )
      );

      document.getElementById("PeriodToDisplayInput").max =
        setMaxValueToPeriodToDisplayInput(this.value);
      this.style.borderColor = "#000000";
    });
  document.getElementById("PeriodInput").addEventListener("click", function () {
    this.value = "";
    this.style.borderColor = "#000000";
  });
  document.getElementById("Load-Data").addEventListener("click", function () {
    loadFile(document.getElementById("csvFileInput").files[0]);
  });
}

window.onLoad = onLoad();
