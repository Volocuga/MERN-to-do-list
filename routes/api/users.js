const User = require("../../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all field" });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with same email is already exist" });
    }

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw error;
        newUser.password = hash;

        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (error, token) => {
              if (error) throw error;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
