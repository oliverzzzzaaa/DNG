const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email) || !Validator.isEmail(data.email)) {
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (
    Validator.isEmpty(data.password) ||
    !Validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else {
      errors.password = "Password must be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
