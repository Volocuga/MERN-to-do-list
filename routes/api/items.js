const express = require("express");
const auth = require("../../middleware/auth");
const Item = require("../../models/Item");

const router = express.Router();

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ status: "success" })))
    .catch(err => res.status(404).json({ status: "error" }));
});

module.exports = router;
