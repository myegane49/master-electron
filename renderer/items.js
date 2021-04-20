const items = document.getElementById('items')

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

exports.select = event => {
  document.querySelector('.read-item.selected').classList.remove('selected')
  event.currentTarget.classList.add('selected')
}

exports.changeSelection = direction => {
  let currenItem = document.querySelector('.read-item.selected')
  if (direction === 'ArrowUp' && currenItem.previousElementSibling) {
    currenItem.classList.remove('selected')
    currenItem.previousElementSibling.classList.add('selected')
  } else if (direction === 'ArrowDown' && currenItem.nextElementSibling) {
    currenItem.classList.remove('selected')
    currenItem.nextElementSibling.classList.add('selected')
  }
}

exports.open = () => {
  if (!this.storage.length) return
  let selectedItem =  document.querySelector('.read-item.selected')
  let contentUrl = selectedItem.dataset.url
  console.log(contentUrl)
}

exports.addItem = (item, isNew) => {
  let itemNode = document.createElement('div')
  itemNode.classList.add('read-item')
  itemNode.innerHTML = `
    <img src="${item.screenshot}">
    <h2>${item.title}</h2>
  `
  itemNode.setAttribute('data-url', item.url)
  items.appendChild(itemNode)

  itemNode.addEventListener('click', this.select)
  itemNode.addEventListener('dblclick', this.open)
  if (document.getElementsByClassName('read-item').length === 1) {
    itemNode.classList.add('selected')
  } 
  if (isNew) {
    this.storage.push(item)
    this.save()
  }
}

this.storage.forEach(item => {
  this.addItem(item)
})