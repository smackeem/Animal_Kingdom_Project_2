// partials/header.ejs
const avatar = document.querySelector('.avatar')
const dropdown = document.querySelector('.nav-user ul')

avatar.addEventListener('click', () => {
	dropdown.classList.toggle('hidden')
})
