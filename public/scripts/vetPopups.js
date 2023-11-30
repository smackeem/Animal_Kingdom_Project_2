const addRecord = document.querySelector('.addrecord')
const newRecordPopup = document.querySelector
('#new-record-popup')
const newRecordCloseBtn = document.querySelector('#new-record-close-btn')

addRecord.addEventListener('click', () => {
	newRecordPopup.classList.remove('hidden')
})
newRecordCloseBtn.addEventListener('click', () => {
	newRecordPopup.classList.add('hidden')
})
