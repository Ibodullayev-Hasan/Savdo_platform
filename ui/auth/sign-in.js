document.addEventListener("DOMContentLoaded", function () {
  // Token bor-yo'qligini tekshirish
  const token = localStorage.getItem("authToken");

  // Agar token mavjud bo'lsa, foydalanuvchini asosiy sahifaga yo'naltirish
  if (token) {
    window.location.href = "/ui/main page/index.html";
    return; // Qolgan kodni bajarishning hojati yo'q
  }

  document.querySelector(
    ".body-sign-in"
  ).style.background = `linear-gradient(black, green, black)`;
});
document
  .querySelector("#sign-in-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      username: this.username.value,
      password: this.password.value,
    };

    fetch("https://test-api5-031z.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 404) {
          window.location.href = "/ui/auth/register.html";
          throw new Error("Ro'yxatdan o'tmagan");
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Serverda xatolik yuz berdi");
        }
      })
      .then((data) => {
        const token = data.data; // Serverdan qaytarilgan token

        localStorage.setItem("authToken", token); // Tokenni saqlash
        window.location.href = "../ui/main page/index.html";
      })
      .catch((error) => {
        const errorMessage = document.getElementById("error-message");
        console.log(error);
        
        if (error.message == "Failed to fetch") {
          error.message = "Connection error. Try again";
          errorMessage.textContent = error.message;
          errorMessage.style.display = "block";
          setTimeout(() => {
            errorMessage.style.display = "none";
          }, 5000);
        } else {
          errorMessage.textContent = error.message;
          errorMessage.style.display = "block";
          setTimeout(() => {
            errorMessage.style.display = "none";
          }, 5000);
        }
      });
  });
