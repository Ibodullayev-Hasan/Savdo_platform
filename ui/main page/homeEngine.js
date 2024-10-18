
let adminName = document.getElementById("adminName");
fetch("https://test-api5-031z.onrender.com/")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Serverda xatolik yuz berdi");
    }
  })
  .then((data) => {
    let admin = data.data.find((el) => el.id == 43);
    adminName.textContent = admin.fullname;
  });

//////////////// img upload ///////////////
document.getElementById("uploadBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  document.getElementById("uploadBtn").style.display = "none";

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      document.getElementById("preview").src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "/index.html";
  }
  document.getElementById("stepAtHome").style.display = "block";
});
