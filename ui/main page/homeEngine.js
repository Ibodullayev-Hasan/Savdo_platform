
let adminName = document.getElementById("adminName");
fetch("https://api-5-six.vercel.app/")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Serverda xatolik yuz berdi");
    }
  })
  .then((data) => {
    let admin = data.data.find((el) => el.fullname === "Hasan Ibodullayev");
    adminName.textContent = admin.fullname;
  });

//////////////// img upload ///////////////
document.getElementById("uploadBtn").addEventListener("click", async function () {
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  const previewImg = document.getElementById("preview");
  const uploadStatus = document.getElementById("uploadStatus");

  if (!file) {
    alert("Iltimos, fayl tanlang!");
    return;
  }

  // Maksimal hajm: 10MB (backend limitiga moslashgan)
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    alert("Fayl hajmi 10MB dan oshmasligi kerak!");
    return;
  }

  // Ruxsat berilgan formatlar (backend limitiga moslashgan)
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  if (!ALLOWED_TYPES.includes(file.type)) {
    alert("Faqat JPEG, JPG yoki PNG fayllar yuklash mumkin!");
    return;
  }

  // Oldindan ko‘rish
  const reader = new FileReader();
  reader.onload = function (event) {
    previewImg.src = event.target.result;
  };
  reader.readAsDataURL(file);

  // API'ga yuborish
  const formData = new FormData();
  formData.append("file", file);

  try {
    uploadStatus.textContent = "⏳ Yuklanmoqda...";
    const response = await fetch("https://crm-img-uploader.up.railway.app/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      previewImg.src = data.fileUrl; // Backenddan qaytgan URL'ni qo‘shish
      uploadStatus.textContent = "✅ Yuklandi!";
    } else {
      throw new Error(data.error || "Yuklashda xatolik yuz berdi!");
    }
  } catch (error) {
    uploadStatus.textContent = "❌ Xatolik: " + error.message;
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "/index.html";
  }
  document.getElementById("stepAtHome").style.display = "block";
});
