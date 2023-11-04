function isEmailValid(email) {
  // Regular expression for matching email addresses
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Use the test() method to check if the email matches the pattern
  return emailPattern.test(email);
}

export const validationSchema = {
  name: {
    required: false,
    errorMessage: {
      isRequired: "Name is required",
    },
  },
  email: {
    required: true,
    validate: (value) => isEmailValid(value),
    errorMessage: {
      isNotValid: "Email is not valid",
    },
  },
  message: {
    required: true,
    validate: (value) => value.length >= 5,
    errorMessage: {
      isNotValid: "Message should be at least 5 characters",
    },
  },
};
