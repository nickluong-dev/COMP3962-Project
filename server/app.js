const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const router = require("./routes/purchases");

app.use("/purchases", router);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Node.js</h1> <h4>Success</h4>");
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
