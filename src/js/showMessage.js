let messageContent = {
	"success": "Your form has been successfully submitted!",
	"error": "There was a validation error. Please check your input!",
	"alreadySubmitted": "You have already submitted this form!",
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

export function showSuccessMessage(didSucceed) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModal = document.querySelector('.close-btn');

    if (didSucceed) {
      if (getHasSubmitted()) {
        modalMessage.textContent = messageContent.alreadySubmitted;
      } else {
        modalMessage.textContent = messageContent.success;
        setHasSubmitted(true);
      }
    } else {
        modalMessage.textContent = messageContent.error;
    }

    modal.style.display = "block";

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}