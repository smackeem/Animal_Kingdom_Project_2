// partials/header.ejs
const avatar = document.querySelector('.avatar')
const dropdown = document.querySelector('.nav-user ul')

avatar.addEventListener('click', () => {
	dropdown.classList.toggle('hidden')
})

// users/signup.ejs
function toggleSpecializationField() {
	const userType = document.querySelector('#userType').value
	const specField = document.querySelector('.specialization-field')
	if (userType === 'Veterinarian') {
		specField.style.display = 'block'
	} else {
		specField.style.display = 'none'
	}
}
