const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
require("./DB/mongoose");
const routes = require("./routes/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  res.send(req.file);
});

app.use(express.json());
app.use(express.urlencoded());

app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
