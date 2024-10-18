// Vercel'dagi API'ga HTTP GET so'rovi yuborish
fetch("https://test-api5-031z.onrender.com/")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Serverda xatolik yuz berdi");
    }
  })
  .then((data) => {
    // Ma'lumotni olish muvaffaqiyatli bo'lganda
    const usersTableBody = document.querySelector("#usersTable tbody");
    const users = data.data.sort((a,b) => a.id - b.id); 

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
