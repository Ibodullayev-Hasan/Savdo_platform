// Vercel'dagi API'ga HTTP GET so'rovi yuborish
fetch("https://api-5-lac.vercel.app/")
  .then((response) => {
    // Agar so'rov muvaffaqiyatli bo'lsa, javob JSON formatida qaytariladi
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Serverda xatolik yuz berdi");
    }
  })
  .then((data) => {
    // Ma'lumotni olish muvaffaqiyatli bo'lganda
    const usersTableBody = document.querySelector("#usersTable tbody");
    const users = data.data; 

    // Har bir foydalanuvchini jadvalga qo'shamiz
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullname}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.phonenumber}</td>
      `;
      usersTableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Xatolik:", error);
  });

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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Serverda xatolik yuz berdi");
        }
      })
      .then((data) => {
        // Javobdagi ma'lumotni jadvallingizga qo'shasiz
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
        console.error("Xatolik:", error);
      });
  });
