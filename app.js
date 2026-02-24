const API_BASE = "https://hydro-tracker-api-nsa-gjgtdch6gydme8fu.eastus-01.azurewebsites.net";

function callBackend() {
  fetch(API_BASE_URL + "/api/health")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById("output").textContent =
        "Error: " + error;
    });
