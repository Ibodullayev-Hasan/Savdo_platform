

// UPDATED 
// ----------------------------------------------------------------------------------
// API'dan foydalanuvchilarni olish
function fetchUsers() {
    fetch('https://test-api5-031z.onrender.com/')
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
  
  /// Populate the table with user data
  function populateTable(users) {
    const usersTableBody = document.querySelector("#updateUsersTable tbody");
    usersTableBody.innerHTML = ''; // Clear existing table rows
  
    users.forEach((user) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${user.id}</td>
        <td><input type="text" value="${user.fullname}" id="fullname-${user.id}" disabled></td>
        <td><input type="text" value="${user.email}" id="email-${user.id}" disabled></td>
        <td><input type="text" value="${user.username}" id="username-${user.id}" disabled></td>
        <td><input type="text" value="${user.password}" id="password-${user.id}" disabled></td>
        <td><input type="text" value="${user.phonenumber}" id="phonenumber-${user.id}" disabled></td>
        <td>
          <button id="update-btn-${user.id}" onclick="toggleEdit(${user.id})">Update User</button>
          <button id="delete-btn-${user.id}" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      usersTableBody.appendChild(row);
    });
  }
  
  // Toggle between "Update" and "Save" for editing user
  function toggleEdit(userId) {
    const isDisabled = document.getElementById(`fullname-${userId}`).disabled;
  
    if (isDisabled) {
      // Enable fields and change button text to "Save"
      document.getElementById(`fullname-${userId}`).disabled = false;
      document.getElementById(`email-${userId}`).disabled = false;
      document.getElementById(`username-${userId}`).disabled = false;
      document.getElementById(`password-${userId}`).disabled = false;
      document.getElementById(`phonenumber-${userId}`).disabled = false;
      document.getElementById(`update-btn-${userId}`).textContent = "Save";
    } else {
      // Update user and change button text back to "Update User"
      updateUser(userId);
      document.getElementById(`fullname-${userId}`).disabled = true;
      document.getElementById(`email-${userId}`).disabled = true;
      document.getElementById(`username-${userId}`).disabled = true;
      document.getElementById(`password-${userId}`).disabled = true;
      document.getElementById(`phonenumber-${userId}`).disabled = true;
      document.getElementById(`update-btn-${userId}`).textContent = "Update User";
    }
  }
  
  // Update user in the database
  function updateUser(userId) {
    const fullname = document.getElementById(`fullname-${userId}`).value;
    const email = document.getElementById(`email-${userId}`).value;
    const username = document.getElementById(`username-${userId}`).value;
    const password = document.getElementById(`password-${userId}`).value;
    const phonenumber = document.getElementById(`phonenumber-${userId}`).value;
  
    fetch(`https://test-api5-031z.onrender.com/user/update/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname, email, username, password, phonenumber })
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated:', data);
        location.reload(); // Reload page after update to keep sorting
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  }
  
  // Delete user from the database
  function deleteUser(userId) {
    fetch(`https://test-api5-031z.onrender.com/user/delete/${userId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload()
          // document.querySelector(`#usersTable tbody tr:nth-child(${userId})`).remove();
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  }
  
  fetchUsers()
  
  
  
