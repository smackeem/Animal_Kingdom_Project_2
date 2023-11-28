const avatar = document.querySelector('.avatar')
const dropdown = document.querySelector('.nav-user ul')
avatar.addEventListener('click', () => {
	dropdown.classList.toggle('hidden')
})

function toggleSpecializationField() {
	const userType = document.querySelector('#userType').value
	const specField = document.querySelector('.specialization-field')
	const specializationInput = document.querySelector("input[name='specialization']")
	if (userType === 'Veterinarian') {
		specField.style.display = 'flex'
		specializationInput.required = true
	} else {
		specField.style.display = 'none'
		specializationInput.required = false
		specializationInput.value = ''
	}
}
