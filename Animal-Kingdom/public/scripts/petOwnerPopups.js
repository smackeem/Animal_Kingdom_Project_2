const addPet = document.querySelector('.addpet')
const newPetPopup = document.querySelector('#new-pet-popup')
const newPetCloseBtn = document.querySelector('#new-pet-close-btn')
const deletePet = document.querySelectorAll('.petDelete')
const deletePetPopup = document.querySelectorAll('.petDeletePopup')
const deletePetCloseBtn = document.querySelectorAll('.pet-delete-cancel')

// console.log(deletePet)
// console.log(deletePetPopup)
// console.log(deletePetCloseBtn)

addPet.addEventListener('click', () => {
	newPetPopup.classList.remove('hidden')
})
newPetCloseBtn.addEventListener('click', () => {
	newPetPopup.classList.add('hidden')
})

// Get the card > to get hidden added and removed -> deletePetPopup
// Get the delete button > to remove hidden from the card -> deletePet
// get the cancel button > to add hidden to the card -> deletePetCloseBtn

const petList = []
const cardList = []

let i = 0

deletePet.forEach((p) => {
	
	p.addEventListener('click', () => {
		const pet = {
			selected: p,
			compare: i,
			//idx: e.pointerId
		}
		const card = {
			selected: deletePetPopup[i],
			compare: i,
			//idx: e.pointerId
		}
		petList.push(pet)
		cardList.push(card)
		console.log(petList)
		i++
		if (petList[i].compare === cardList[i].compare) {
			cardList[i].classList.remove('hidden')
		}

		// console.log(petList)
		// console.log(cardList)
		for (let i = 0; i < petList.length; i++){
			console.log(petList[i])
			console.log(cardList[i])
		}
	})
})

/*
1. Get the index of the deletePet X button
2. get the index of the deletePetPopup card
3. compare if they are the same
4. if yes, remove the hidden clas from the card
*/

deletePetCloseBtn.forEach((pet) => {
	// pet.addEventListener('click', handlePetCloseBtn)
})


