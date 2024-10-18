document.getElementById("searchButton").addEventListener("click", function () {
  const searchValue = document.getElementById("searchInput").value.trim();

  if (searchValue === "") {
    fetchUsers();
  } else {
    searchUsersByName(searchValue);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchValue = document.getElementById("searchInput").value.trim();

    if (searchValue === "") {
      fetchUsers();
    } else {
      searchUsersByName(searchValue);
    }
  }
});

document.addEventListener("keydown", function () {
  const searchValue = document.getElementById("searchInput").value.trim();

  if (searchValue === "") {
    fetchUsers();
  } else {
    searchUsersByName(searchValue);
  }
});

function fetchUsers() {
  fetch("https://test-api5-031z.onrender.com/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Serverda xatolik yuz berdi");
      }
    })
    .then((data) => {
      populateTable(data.data);
    })
    .catch((error) => {
      console.error("Xatolik:", error);
    });
}

// Ma'lumotlarni jadvalga qo'shish funksiyasi
function populateTable(users) {
  const usersTableBody = document.querySelector("#usersTable tbody");
  usersTableBody.innerHTML = "";
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
}

function searchUsersByName(name) {
  fetch(`https://test-api5-031z.onrender.com/search/name/${name}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Qidiruvda xatolik yuz berdi");
      }
    })
    .then((data) => {
      document.querySelector(".usersTablediv").style.display = "block";
      document.querySelector("#no-thing").style.display = "none";

      if (Array.isArray(data.data)) {
        if (data.data.length > 0) {
          populateTable(data.data); // Ma'lumotlarni jadvalga joylash
        } else {
          document.querySelector(".usersTablediv").style.display = "none";
          document.querySelector("#no-thing").style.display = "block";
        }
      } else {
        // Agar data.data obyekt bo'lsa, uni massivga aylantirib jadvalga joylash
        populateTable([data.data]);
      }
    })
    .catch((error) => {
      console.error("Xatolik:", error);
    });
}

//////////////// img upload ///////////////
document.getElementById("uploadBtn").style.display = "block";
document.getElementById("uploadBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  document.getElementById("uploadBtn").style.display = "none";

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      document.getElementById("preview").src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", function(){
  fetchUsers()
  document.getElementById("stepAtHome").style.display = "none";
  document.getElementById("stepAtUsers").style.display = "block";
});
