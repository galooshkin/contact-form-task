import { showSuccessMessage } from "./validateForm.js";
import { validationSchema } from "./validationSchema.js";
import { selectors } from "./selectors.js";

const {
  form,
  nameField,
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
function toggleValidationColors(field, isValid) {
  !isValid
    ? field.classList.add("not-valid")
    : field.classList.remove("not-valid");
  field.classList.add("valid");
}
const validateNameField = (event) => {
  nameField.style.outline = "none";
  nameField.classList.add("valid");
};
const validateMessageField = (event) => {
  const isValid = validationSchema.message.validate(event.target.value);
  if (!isValid) {
    // show input error
    messageField.style.outline = "none";
    toggleValidationColors(messageField, isValid);
    formValidationState.message = false;
    messageError.textContent = validationSchema.message.errorMessage.isNotValid;
    messageError.style.display = "block";
    return;
  }

  // hide input error
  toggleValidationColors(messageField, isValid);
  formValidationState.message = true;
  messageError.style.display = "none";
  toggleSubmitButton();
};

const validateEmailField = (event) => {
  const isValid = validationSchema.email.validate(event.target.value);
  emailField.style.outline = "none";
  if (!isValid) {
    formValidationState.email = false;
    toggleValidationColors(emailField, isValid);
    emailError.textContent = validationSchema.email.errorMessage.isNotValid;
    emailError.style.display = "block";
    toggleSubmitButton();
    return;
  }
  toggleValidationColors(emailField, isValid);
  formValidationState.email = true;
  emailError.style.display = "none";
  toggleSubmitButton();
};

export function hydrateForm() {
  form.addEventListener("submit", onSubmitHandler);
  nameField.addEventListener("keydown", validateNameField);

  emailField.addEventListener("blur", validateEmailField);
  emailField.addEventListener("keydown", validateEmailField);

  messageField.addEventListener("blur", validateMessageField);
  messageField.addEventListener("keydown", validateMessageField);
}
