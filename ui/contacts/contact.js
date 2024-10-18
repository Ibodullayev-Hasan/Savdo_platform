document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/index.html";
    }

    document.getElementById("stepAtHome").style.display = "none";
    document.getElementById("stepAtContacts").style.display = "block";
  });