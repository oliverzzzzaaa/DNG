const router = require("express").Router();
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys_dev")
// const keys = require("../../config/keys");

function signJwt(user, response) {
  const payload = { id: user.id, name: user.username };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, response);
}

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.login = "Incorrect email or password";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        signJwt(user, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.login = "Incorrect email or password";
        return res.status(404).json(errors);
      }
    });
  });
});

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(404).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              signJwt(user, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              })
            )
            .catch(err => { 
              errors.internal = "Sign up is not available now, Please try later!"
              res.status(404).json(errors);
           });
        });
      });
    }
  });
});

module.exports = router;
