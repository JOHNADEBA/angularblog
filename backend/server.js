const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const Post = require("./model/posts");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.URL)
  .then((res) => {
    app.listen(port, () => {
      console.log(`${port} connected at ${new Date()}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  const newPost = new Post(req.body);
  newPost
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      res.send(`deleted succesfully`);
    })
    .catch((err) => console.log(err));
});
app.put("/:id", (req, res) => {
  console.log(req.body);
  const body = req.body;
  const id = req.params.id;
  Post.findByIdAndUpdate(id, body, (err, updatedPost) => {
    if (err) {
      res.json({
        body,
        success: false,
        msg: "Failed to update board",
      });
    } else {
      res.json({ body, success: true, msg: "Post added" });
    }
  });

});
