const Model = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  console.log(req.body);

  const formdata = req.body;

  Model.findOne({ email: formdata.email, password: formdata.password })
    .then((data) => {
      if (data) {
        if (data.password == formdata.password) {
          res.status(200).json(data);
        } else {
          res.status(300).json({ message: "password incorrect" });
        }
      } else {
        res.status(300).json({ message: "email not found" });
      }
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
