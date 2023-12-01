const avatar = document.querySelector(".avatar");
const dropdown = document.querySelector(".nav-user ul");
avatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

function toggleSpecializationField() {
  const userType = document.querySelector("#userType").value;
  const specField = document.querySelector(".specialization-field");
  const specializationInput = document.querySelector(
    "input[name='specialization']"
  );
  if (userType === "Veterinarian") {
    specField.style.display = "flex";
    specializationInput.required = true;
  } else {
    specField.style.display = "none";
    specializationInput.required = false;
    specializationInput.value = "";
  }
}

function confirmDelete() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle confirmed action
      const form = document.querySelector("#deleteForm");
      form.submit();
      Swal.fire('Deleted!', 'Your pet has been deleted.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle canceled action
      Swal.fire('Cancelled', 'Your pet is safe :)', 'info');
    }
  });
}

// Inside functions.js
function toggleDropdown() {
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  } else {
    console.error("Dropdown element not found");
  }
}
