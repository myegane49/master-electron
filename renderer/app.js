const {ipcRenderer, TouchBarOtherItemsProxy} = require('electron')

const items = require('./items')

const showModal = document.getElementById('show-modal')
const closeModal = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const addItem = document.getElementById('add-item')
const itemUrl = document.getElementById('url')

const toggleModalButtons = () => {
  if (addItem.disabled) {
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = 'Add Item'
    closeModal.style.display = 'inline'
  } else {
    addItem.disabled = true
    addItem.style.opacity = .5
    addItem.innerText = 'Adding...'
    closeModal.style.display = 'none'
  }
}

showModal.addEventListener('click', event => {
  modal.style.display = 'flex'
  itemUrl.focus()
})

closeModal.addEventListener('click', event => {
  modal.style.display = 'none'
})

addItem.addEventListener('click', event => {
  if (itemUrl.value) {
    ipcRenderer.send('new-item', itemUrl.value)
    toggleModalButtons()
  }
})

itemUrl.addEventListener('keyup', event => {
  if (event.key === 'Enter') addItem.click()
})

ipcRenderer.on('new-item-success', (event, newItem) => {
  items.addItem(newItem, true)
  toggleModalButtons()
  modal.style.display = 'none'
  itemUrl.value = ''
})