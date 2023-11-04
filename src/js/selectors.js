const form = document.querySelector("form")
const nameField = document.getElementById("name")
const emailField = document.getElementById("email")
const messageField = document.getElementById("message")
const submitButton = document.getElementById("submit")
const modal = document.getElementById("modal")
const modalMessage = document.getElementById("modal-message")
const closeModal = document.querySelector(".close-btn")
const errorMessages = document.querySelector(".error-messages")
const emailError = document.getElementById("emailError")
const messageError = document.getElementById("messageError")
messageError

if (!form) {
  alert("NO FORM FOUND")
}

export const selectors = {
  form,
  modal,
  modalMessage,
  closeModal,
  errorMessages,
  nameField,
  emailField,
  messageField,
  submitButton,
  emailError,
  messageError,
}
