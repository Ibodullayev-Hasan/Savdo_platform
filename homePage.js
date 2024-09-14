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
    const users = data.data; // API javobidan foydalanuvchilarni olamiz

    // Har bir foydalanuvchini jadvalga qo'shamiz
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${user.phoneNumber}</td>
      `;
      usersTableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Xatolik:", error);
  });
