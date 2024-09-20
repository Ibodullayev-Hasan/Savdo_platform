document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken");
  let adminName = document.getElementById("adminName");
  adminName.textContent = "Ibodullayev Hasan";

  //////////////// img upload ///////////////
  document.getElementById("uploadBtn").style.display = "block";
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

  if (token) {
    let adminName = document.getElementById("adminName");
    fetch("https://api-5-lac.vercel.app/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Serverda xatolik yuz berdi");
        }
      })
      .then((data) => {
        let admin = data.data.find((el) => el.id == 44);
        adminName.textContent = "Ibodullayev Xasan";
      });
  } else {
    window.location.href = "/index.html";
  }
});
