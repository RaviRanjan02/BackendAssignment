// const path = require("path");

const express = require("express");

const User = require("../Models/user.model");

// yaha pe hum uploads middlw ware import kar rahe hain

const uploads = require("../middlewares/uploads");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", uploads.single("profilePic"), async (req, res) => {
  //uploads.single() is a middle ware
  try {
    // console.log(req.body);    //path.join(__dirname,"../uploads")
    // console.log(req.file);    // ye hume file ke sare content ki information dega

    // inserting into the database
    const users = await User.create({
      firstName: req.body.firstName,
      profilePic: req.file.path,
    });
    return res.status(200).send("users");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// for multiples files to upload you can use uploads.array/any
router.post("/multiples", uploads.array("profilePic", 5), async (req, res) => {
  //uploads.single() is a middle ware
  try {
    // console.log(req.body);    //path.join(__dirname,"../uploads")
    // console.log(req.file);    // ye hume file ke sare content ki information dega

    // inserting into the database
    const filePaths = req.files.map((file) => {
      console.log({ file });
      return file.path;
    });

    // console.log({filepath});

    const users = await User.create({
      firstName: req.body.firstName,
      profilePic: filePaths,
    });

    return res.status(200).send("users");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
