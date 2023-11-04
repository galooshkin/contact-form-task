import { showSuccessMessage } from "./validateForm.js";
import { validationSchema } from "./validationSchema.js";
import { selectors } from "./selectors.js";

const {
  form,
  emailField,
  messageField,
  submitButton,
  emailError,
  messageError,
} = selectors;

function onSubmitHandler(event) {
  event.preventDefault();
  showSuccessMessage(true);
}

function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.classList.add("disabled");
}

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.classList.remove("disabled");
}

const formValidationState = {
  email: false,
  message: false,
  submit: false,
};

const toggleSubmitButton = () => {
  return formValidationState.email && formValidationState.message
    ? enableSubmitButton()
    : disableSubmitButton();
};

const validateMessageField = (event) => {
  const isValid = validationSchema.message.validate(event.target.value);
  if (!isValid && event.target.value !== "") {
    // show input error
    formValidationState.message = false;
    messageError.textContent = validationSchema.message.errorMessage.isNotValid;
    messageError.style.display = "block";
    return;
  }

  // hide input error
  formValidationState.message = true;
  messageError.style.display = "none";
  toggleSubmitButton();
};

const validateEmailField = (event) => {
  const isValid = validationSchema.email.validate(event.target.value);

  if (!isValid && event.target.value !== "") {
    formValidationState.email = false;
    emailError.textContent = validationSchema.email.errorMessage.isNotValid;
    emailError.style.display = "block";
    toggleSubmitButton();
    return;
  }

  formValidationState.email = true;
  emailError.style.display = "none";
  toggleSubmitButton();
};

export function hydrateForm() {
  form.addEventListener("submit", onSubmitHandler);

  emailField.addEventListener("blur", validateEmailField);
  emailField.addEventListener("keydown", validateEmailField);

  messageField.addEventListener("blur", validateMessageField);
  messageField.addEventListener("keydown", validateMessageField);
}
