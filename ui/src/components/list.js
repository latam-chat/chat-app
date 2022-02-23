import user from "../store/user"

const usrList = document.getElementById("user-list") // lista de usuarios

const users = []

function renderUser(u) {
  if (u.name == user.name) {
    return
  }

  users.push(u)

  const liEl = document.createElement("li")
  liEl.innerHTML = u.name
  usrList.appendChild(liEl)
}

function resetUserList() {
  usrList.innerHTML = null

  const meEl = document.createElement("li") // <li>🙋🏻‍♂️</li>
  meEl.innerHTML = "🙋🏻‍♂️"
  usrList.appendChild(meEl)
}

export {
  renderUser,
  resetUserList
}