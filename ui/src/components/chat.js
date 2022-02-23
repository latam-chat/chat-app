// obtenemos todos los elementos de la UI que vamos a manipular
import user from "../store/user"

const messageInput = document.getElementById("message-input") // input del chat
const sendBtn = document.getElementById("send-btn") // boton de enviar
const msgPool = document.getElementById("message-pool") // lista de mensajes

sendBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (!messageInput.value) {
    return
  }

  const message = {
    message: messageInput.value,
    date: Date.now(),
    user: user.name
  }

  user.socket.emit("message", message) // ya envie el mensaje
  render(message)
  messageInput.value = null
})

function render(data) {
  const msgElement = document.createElement("div")
  const userEl = `<span class="user">${data.user}</span>`
  const timeEl = `<span class="date-time">${new Date(data.date).toLocaleString()}</span> &nbsp;`
  const cssClass = data.user == user.name ? "local" : "remote"
  msgElement.classList.add(cssClass)
  msgElement.innerHTML = `
    <div class="message-data uk-text-small ${cssClass === "local" ? "align-right" : ""}">
      ${cssClass === "local" ? userEl + timeEl : timeEl + userEl}
    </div>
    <div class="message-body">${data.message}</div>
  `
  msgPool.appendChild(msgElement)
  msgPool.scrollTop = msgPool.scrollHeight // scroll hasta abajo
}

export { render }