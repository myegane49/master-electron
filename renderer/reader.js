let readitClose = document.createElement('div')
readitClose.innerText = 'done'

readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'
readitClose.style.right = '15px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.backgroundColor = 'dodgerblue'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0, .2)'
readitClose.style.zIndex = '1000'

document.querySelector('body').append(readitClose)

readitClose.onclick = event => {
  window.opener.postMessage({
    action: 'delete-reader-item',
    itemIndex: {{index}}
  }, '*')
}