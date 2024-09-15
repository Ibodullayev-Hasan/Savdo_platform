// CREATED
// ----------------------------------------------------------------------------------

// POST so'rovini yuborish
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Formani yuborishni oldini oladi

    const formData = {
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      phonenumber: this.phonenumber.value,
    };

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
          // Agar status 409 bo'lsa, foydalanuvchi mavjud
          throw new Error("Siz avval ro'yxatdan o'tgansiz❗");
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Serverda xatolik yuz berdi");
        }
      })
      .then(() => {
        window.location.reload();
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
        // Xatolikni ekranga chiqarish (masalan, "already exist user")
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 15000);
      });
  });
