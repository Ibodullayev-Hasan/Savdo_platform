document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".sign-up").style.display = "flex";
});

// **📌 Rasmni yuklash logikasi**
document.getElementById("uploadBtn").addEventListener("click", async function () {
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  const uploadStatus = document.getElementById("uploadStatus");
  const imgUrlInput = document.getElementById("img_url");

  if (!file) {
      alert("Iltimos, fayl tanlang!");
      return;
  }

  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
      alert("Fayl hajmi 10MB dan oshmasligi kerak!");
      return;
  }

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Faqat JPEG, JPG yoki PNG fayllar yuklash mumkin!");
      return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
      uploadStatus.textContent = "⏳ Yuklanmoqda...";
      const response = await fetch("https://upload-image-test-phi.vercel.app/upload", {
          method: "POST",
          body: formData,
      });

      const data = await response.json();
      console.log("Server javobi:", data); // 🟢 API'dan kelgan malumot

      if (response.ok) {
          imgUrlInput.value = data.fileUrl; // 📌 URL'ni inputga yozish
          console.log("Hidden inputga yozilgan URL:", imgUrlInput.value); // 🟢 Konsolda tekshiramiz
          uploadStatus.textContent = "✅ Yuklandi!";
      } else {
          throw new Error(data.error || "Yuklashda xatolik yuz berdi!");
      }
  } catch (error) {
      uploadStatus.textContent = "❌ Xatolik: " + error.message;
  }
});


// **📌 Foydalanuvchini ro'yxatdan o'tkazish**
document.getElementById("sign-up-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const imgUrlInput = document.getElementById("img_url");
  const img_url = imgUrlInput ? imgUrlInput.value : "";
  console.log("Final img_url before sending:", img_url);

  if (!img_url) {
      alert("Iltimos, rasm yuklang!");
      return;
  }

  const formData = {
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      phonenumber: this.phonenumber.value,
      img_url: img_url, // ✅ To'g'ri URL qo'shildi
  };

  console.log("Yuborilayotgan formData:", JSON.stringify(formData, null, 2));

  try {
      const response = await fetch("https://api-5-six.vercel.app/user/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Serverdan kelgan javob:", data);

      if (!response.ok) {
          throw new Error(data.message || "Serverda xatolik yuz berdi");
      }

      localStorage.setItem("authToken", data.token);
  } catch (error) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
      setTimeout(() => {
          errorMessage.style.display = "none";
      }, 5000);
  }
});

