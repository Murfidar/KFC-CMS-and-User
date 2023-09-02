if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}
const Cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes/");
const port = process.env.PORT || 3000;


app.use(Cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app