document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken");

  // Token mavjud bo'lsa, asosiy sahifaga yo'naltirish
  if (token) {
    let inputImg = document.getElementById("inputImg");
    let fileUpload = document.getElementById("uploadImg");
    fileUpload.onchange = function () {
      inputImg.src = URL.createObjectURL(fileUpload.files[0]);
      console.log(inputImg);
    };

    const fn = () => {
      return "Admin name...";
    };

    let adminName = document.getElementById("adminName");
    adminName.textContent = fn();
  } else {
    window.location.href = "/index.html";
  }
});
