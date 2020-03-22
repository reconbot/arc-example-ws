// get the web socket url from the backend
const url = window.WS_URL

// all the DOM nodes this script will mutate
const messages = document.getElementsByTagName('main')[0]
const input = document.getElementById('message')

// setup the web socket
const ws = new WebSocket(url)

ws.onopen = () => {
  let ts = new Date(Date.now()).toISOString()
  messages.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`
}

ws.onclose = () => {
  messages.innerHTML = 'Closed <a href=/>reload</a>'
}

ws.onmessage = e =>  {
  let msg = JSON.parse(e.data)
  messages.innerHTML += `<p><code>${msg.text}</code></p>`
}

ws.onerror = console.log

// sends messages to the lambda
input.addEventListener('keyup', e => {
  if (e.key == 'Enter') {
    let text = e.target.value // get the text
    e.target.value = ''       // clear the text
    ws.send(JSON.stringify({text}))
  }
})
