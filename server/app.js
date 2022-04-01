const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/purchases");

app.use(cors());
app.use(express.json());
app.use("/purchases", router);

app.get("/", (req, res) => {
  res.send("<h1> Node.js</h1> <h4>Success</h4>");
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
