const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const passport = require("passport");
// const { TokenExpiredError } = require("jsonwebtoken");

const Mongo = require("./keys").mongoDbkey;

mongoose
  .connect(process.env.MONGO_URI || Mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use("/api/products/", require("./routes/products"));

app.use("/api/users/", require("./routes/users"));

app.use(
  "/api/orders/",
  passport.authenticate("jwt", { session: false }),
  require("./routes/userorder")
);
app.use(
  "/api/guest/",

  require("./routes/guest")
);

app.use("/", express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server up and running on ${PORT}`);
});
