import "./styles/app.css"

import UIkit from "uikit"
import { io } from "socket.io-client";

import user from "./store/user"
import { resetUserList, renderUser } from "./components/list"
import { render } from "./components/chat"

const chatContainerEl = document.getElementById("chat-container")
const modalEl = document.getElementById("modal-full") // modal
const inputNameEl = document.getElementById("input-name") // input del modal

// Utilizamos el modal de UI para iniciar 
// el usuario debe de ingresar su nombre para poder utilizarlo
UIkit.modal(modalEl).show();

// escuchar el evento cuando el modal se cierra y ejecutar la logica inicial
UIkit.util.on("#modal-full", "hidden", () => {

  // mostamos el contenedor del chat que estaba escondido
  chatContainerEl.classList.toggle("hidden")
  document.getElementById("username").innerText = user.name

  // iniciar socket io
  user.socket = io()

  // se envia el nombre de usuario
  user.socket.emit("iam", user.name)

  user.socket.on("users", renderUser)

  user.socket.on("message", render) // nuevo mensaje recibido

  resetUserList()
})

// callback para saber cuando el usuario ha ingresado su nombre y cerrar el modal
inputNameEl.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    if (!e.target.value) {
      return
    }

    user.name = e.target.value // guardar nombre de usuario en un objeto global
    UIkit.modal(modalEl).hide(); // cerrar el modal
  }
})