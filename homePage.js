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











  
  // CREATED
// ----------------------------------------------------------------------------------

// POST so'rovini yuborish
document.getElementById("userForm").addEventListener("submit", function (event) {
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
        throw new Error("Siz avval ro'yxatdan o'tgansiz");
      } else if (response.ok) {
        return response.json();
      } else {
        throw new Error("Serverda xatolik yuz berdi");
      }
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
      const errorMessage = document.getElementById("error-message")
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
      errorMessage.style.color = "red"; // Error rangini qizil qilish
    });
});









// UPDATED 
// ----------------------------------------------------------------------------------
// API'dan foydalanuvchilarni olish
function fetchUsers() {
  fetch('https://api-5-lac.vercel.app/')
    .then(response => {
      if (response.ok) {
        return response.json(); // Javobni JSON formatiga o'tkazamiz
      } else {
        throw new Error('Serverda xatolik yuz berdi');
      }
    })
    .then(data => {
      if (Array.isArray(data.data)) {
        // Ma'lumotlarni tartiblash (masalan, `id` bo'yicha o'sish tartibida)
        const sortedUsers = data.data.sort((a, b) => a.id - b.id);
        populateTable(sortedUsers); // API javobidagi "data" dan array olamiz
      } else {
        console.error('Noto\'g\'ri ma\'lumot turi');
      }
    })
    .catch(error => {
      console.error("Xatolik foydalanuvchilarni olishda:", error); // Xatolikni konsolga chiqaramiz
    });
}

// Jadvalni to'ldirish
function populateTable(users) {
  const usersTableBody = document.querySelector("#updateUsersTable tbody");
  usersTableBody.innerHTML = ''; // Jadvalni tozalaymiz

  // Har bir foydalanuvchini jadvalga qo'shamiz
  users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td><input type="text" value="${user.fullname}" id="fullname-${user.id}" disabled></td>
      <td><input type="text" value="${user.email}" id="email-${user.id}" disabled></td>
      <td><input type="text" value="${user.username}" id="username-${user.id}" disabled></td>
      <td><input type="text" value="${user.password}" id="password-${user.id}" disabled></td>
      <td><input type="text" value="${user.phonenumber}" id="phonenumber-${user.id}" disabled></td>
      <td><button id="update-btn-${user.id}" onclick="toggleEdit(${user.id})">Update User</button></td>
    `;

    usersTableBody.appendChild(row); // Yangi qatorni jadvalga qo'shamiz
  });
}

// Toggle qilish funksiyasi (Update <-> Save)
function toggleEdit(userId) {
  const fullnameInput = document.getElementById(`fullname-${userId}`);
  const emailInput = document.getElementById(`email-${userId}`);
  const usernameInput = document.getElementById(`username-${userId}`);
  const passwordInput = document.getElementById(`password-${userId}`);
  const phonenumberInput = document.getElementById(`phonenumber-${userId}`);
  const updateBtn = document.getElementById(`update-btn-${userId}`);

  if (updateBtn.innerText === 'Update User') {
    // Ma'lumotlarni o'zgartirishga ruxsat beramiz
    fullnameInput.disabled = false;
    emailInput.disabled = false;
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    phonenumberInput.disabled = false;

    // Buttonni "Save" ga o'zgartiramiz
    updateBtn.innerText = 'Save';
    updateBtn.style.backgroundColor = 'green';
  } else {
    // Ma'lumotlarni saqlaymiz
    const updatedData = {
      fullname: fullnameInput.value,
      email: emailInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
      phonenumber: phonenumberInput.value
    };

    updateUser(userId, updatedData); // Userni yangilash
  }
}

// User ma'lumotlarini yangilash
function updateUser(userId, updatedData) {
  fetch(`https://api-5-lac.vercel.app/user/update/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Userni yangilashda xatolik');
      }
    })
    .then(() => {
      // User yangilandi, sahifani qayta yuklaymiz
      window.location.reload();
    })
    .catch(error => {
      console.error('Userni yangilashda xatolik:', error);
    });
}

// Sahifa yuklanganda API'dan foydalanuvchilarni olish
document.addEventListener("DOMContentLoaded", function() {
  fetchUsers();
});
