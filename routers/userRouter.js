const Model = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/signup", (req, res) => {
  console.log(req.body);

  const formData = req.body;

  // Hash the password
  bcrypt.hash(formData.password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Replace the plain password with the hashed password
    formData.password = hash;

    // Save the user data to the database
    new Model(formData)
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);

  const formData = req.body;

  Model.findOne({ email: formData.email })
    .then((data) => {
      if (data) {
        // Compare the hashed password with the provided password
        bcrypt.compare(formData.password, data.password, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json(err);
          }
          if (result) {
            // Passwords match, return user data
            res.status(200).json(data);
          } else {
            // Passwords don't match
            res.status(300).json({ message: "Password incorrect" });
          }
        });
      } else {
        res.status(300).json({ message: "Email not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/getall", async (req, res) => {
  Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  Model.findByIdAndUpdate(userId, updateData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
