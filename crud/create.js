// CREATE
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".sign-up").style.display = "flex";
});
let a = document.getElementById("sign-up-form").value;
console.log(a);

document
  .getElementById("sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Formani yuborishni oldini oladi

    const formData = {
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      phonenumber: this.phonenumber.value,
    };

    // console.log(formData.username);

    // API'ga POST so'rovi yuborish
    fetch("https://api-5-lac.vercel.app/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 409) {
          throw new Error("Siz avval ro'yxatdan o'tgansiz❗");
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Serverda xatolik yuz berdi");
        }
      })
      .then((data) => {
        const token = data.token; // Serverdan qaytarilgan token

        localStorage.setItem("authToken", token);
        window.location.href = "/ui/main page/index.html";
      })

      .then((data) => {
        // Muvaffaqiyatli bo'lsa, yangi foydalanuvchini jadvallingizga qo'shasiz
        const usersTableBody = document.querySelector("#usersTable tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${data.data.id}</td>
        <td>${data.data.fullname}</td>
        <td>${data.data.email}</td>
        <td>${data.data.username}</td>
        <td>${data.data.password}</td>
        <td>${data.data.phonenumber}</td>
      `;
        usersTableBody.appendChild(row);
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

let h1 = document.querySelector(".sign-title");
h1.textContent = "Sign up";
