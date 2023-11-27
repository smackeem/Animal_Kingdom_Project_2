const avatar = document.querySelector(".avatar");
const dropdown = document.querySelector(".nav-user ul");
const addPet = document.getElementById("add-pet");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");

// partials/header.ejs
avatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// users/show.ejs - Popup
addPet.addEventListener("click", () => {
  popup.classList.remove("hidden");
});
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

function toggleSpecializationField() {
  console.log("toggleSpecializationField called"); // For debugging
  const userType = document.querySelector("#userType").value;
  const specField = document.querySelector(".specialization-field");
  const specializationInput = document.querySelector(
    "input[name='specialization']"
  );

  if (userType === "Veterinarian") {
    specField.style.display = "flex"; // Show the field
    specializationInput.required = true;
    console.log("Specialization field should be visible and required"); // For debugging
  } else {
    specField.style.display = "none"; // Hide the field
    specializationInput.required = false;
    specializationInput.value = ""; // Clear the input
    console.log("Specialization field should be hidden and not required"); // For debugging
  }
}
