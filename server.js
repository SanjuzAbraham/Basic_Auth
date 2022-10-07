const { urlencoded } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/download-file", (req, res) => {
  res.download("./public/docs/Personal Resume.pdf");
});

const userrouter = require("./routes/userRouter.js");
app.use("/api/users", userrouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
