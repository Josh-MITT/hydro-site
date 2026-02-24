const API_BASE = "https://hydro-tracker-api-nsa-gjgtdch6gydme8fu.eastus-01.azurewebsites.net";

document.getElementById("hydro-form").addEventListener("submit", submitForm);

function buildPayload() {
  return {
    submissionId: document.getElementById("sub-id").value.trim(),
    region: document.getElementById("reg").value,
    city: document.getElementById("city").value.trim(),
    latitude: document.getElementById("lat").value.trim(),
    longitude: document.getElementById("lon").value.trim(),
    connectionType: document.getElementById("con-ty").value,
    requestedCapacityRange: document.getElementById("cap-r").value.trim(),
    submittedDate: document.getElementById("sub-date").value,
    connectionCompletionDate: document.getElementById("comp-date").value,
    status: document.getElementById("stat").value,
    waitTimeDays: Number(document.getElementById("wait").value || 0),
    lastUpdated: document.getElementById("lst-up").value
  };
}

async function submitForm(event) {
  event.preventDefault();

  const payload = buildPayload();

  if (!payload.region || !payload.connectionType || !payload.status) {
    alert("Please select Region, Connection Type, and Status.");
    return;
  }

  try {
    const res = await fetch(API_BASE_URL + "/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const bodyText = await res.text();

    if (!res.ok) {
      document.getElementById("output").textContent =
        "Backend error " + res.status + ":\n" + bodyText;
      return;
    }

    document.getElementById("output").textContent =
      "Submitted successfully:\n" + bodyText;

  } catch (err) {
    document.getElementById("output").textContent =
      "Network error:\n" + err;
  }
}

async function callBackend() {
  try {
    const res = await fetch(API_BASE_URL + "/api/health");
    const text = await res.text();
    document.getElementById("output").textContent = text;
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err;
  }
}
 
