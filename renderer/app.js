const {ipcRenderer, TouchBarOtherItemsProxy} = require('electron')

const items = require('./items')

const showModal = document.getElementById('show-modal')
const closeModal = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const addItem = document.getElementById('add-item')
const itemUrl = document.getElementById('url')
const search = document.getElementById('search')

ipcRenderer.on('menu-show-modal', () => {
  showModal.click()
})
ipcRenderer.on('menu-open-item', () => {
  items.open()
})
ipcRenderer.on('menu-delete-item', () => {
  let selectedItem = items.getSelectedItem()
  items.delete(selectedItem.index)
})
ipcRenderer.on('menu-open-item-native', () => {
  items.openNative()
})
ipcRenderer.on('menu-focus-search', () => {
  search.focus()
})

search.addEventListener('keyup', event => {
  Array.from(document.getElementsByClassName('read-item')).forEach(item => {
    let hasMatch = item.innerText.toLowerCase().includes(search.value)
    item.style.display = hasMatch ? 'flex' : 'none'
  })
})

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    items.changeSelection(event.key)
  }
})

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