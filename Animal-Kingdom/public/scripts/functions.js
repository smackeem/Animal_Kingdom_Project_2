// public/scripts/functions.js
// partials/header.ejs
const avatar = document.querySelector(".avatar");
const dropdown = document.querySelector(".nav-user ul");

avatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// users/signup.ejs
function toggleSpecializationField() {
  console.log("toggleSpecializationField called"); // For debugging
  const userType = document.querySelector("#userType").value;
  const specField = document.querySelector(".specialization-field");
  if (userType === "Veterinarian") {
    specField.style.display = "flex";
  } else {
    specField.style.display = "none";
  }
}
