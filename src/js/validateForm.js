import { selectors } from "./selectors.js";

const { modal, closeModal, modalMessage } = selectors;

const messageContent = {
  success: "Your form has been successfully submitted!",
  error: "There was a validation error. Please check your input!",
  alreadySubmitted: "You have already submitted this form!",
};

let successState = false;

// Getter function for successState
export function getHasSubmitted() {
  return successState;
}

// Setter function for successState
export function setHasSubmitted(value) {
  successState = value;
}

export function showMessageModal() {
  modal.style.display = "block";
}

export function hideMessageModal() {
  modal.style.display = "none";
}

export function showSuccessMessage(didSucceed) {
  closeModal.onclick = function () {
    hideMessageModal();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  if (!didSucceed) {
    modalMessage.textContent = messageContent.error;
    return showMessageModal();
  }

  modalMessage.textContent = getHasSubmitted()
    ? messageContent.alreadySubmitted
    : messageContent.success;

  setHasSubmitted(true);

  showMessageModal();
}

export function showErrorMessage(message, target) {
  target.style.display = "block";
}

export function showFormMessage(messages) {
  errorMessage.style.display = "block";
  errorMessage.innerHTML = "";
  messages.forEach((message) => {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    errorElement.style.display = "block";
    errorMessage.appendChild(errorElement);
  });
}
