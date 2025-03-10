const BUG_API_URL = "https://script.google.com/macros/s/AKfycbxKSjNcaTb14adZgKCUgXYkTJ4YdFw5si6i7dFTgeDorpoNlIcCCuVUArkeSdb3rgw2/exec";

async function submitBugReport() {
    const bugTitle = document.getElementById("bugTitle").value.trim();
    const description = document.getElementById("description").value.trim();
    const steps = document.getElementById("steps").value.trim();
    const expected = document.getElementById("expected").value.trim();
    const actual = document.getElementById("actual").value.trim();
    const device = document.getElementById("device").value.trim();
    const logs = document.getElementById("logs").value.trim();

  const formData = new URLSearchParams();
  formData.append("bugTitle", bugTitle);
  formData.append("description", description);
  formData.append("steps", steps);
  formData.append("expected", expected);
  formData.append("actual", actual);
  formData.append("device", device);
  formData.append("logs", logs);

  try {
    const response = await fetch(BUG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    console.log("Response text:", text);
  } catch (error) {
    console.error("Error submitting bug report:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitButton").addEventListener("click", (event) => {
    event.preventDefault();
    submitBugReport();
  });
});
