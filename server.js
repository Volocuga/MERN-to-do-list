const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const db = config.get("mongoURI");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("mongoose connect"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
