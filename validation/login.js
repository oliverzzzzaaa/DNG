const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email) || !Validator.isEmail(data.email)) {
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
