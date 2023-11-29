const addPet = document.querySelector('.addpet')
const newPetPopup = document.querySelector('#new-pet-popup')
const newPetCloseBtn = document.querySelector('#new-pet-close-btn')

addPet.addEventListener('click', () => {
	newPetPopup.classList.remove('hidden')
})
newPetCloseBtn.addEventListener('click', () => {
	newPetPopup.classList.add('hidden')
})
