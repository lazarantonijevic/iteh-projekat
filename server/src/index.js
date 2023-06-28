const express = require("express");
const cors = require("cors");
const session = require('express-session');

let port = process.env.PORT || 8080;

const connect = require("./configs/db");

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

const passport = require("./configs/google-oauth");

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());






const orderRoute = require("./controllers/order.controller");


const productApi = require("./controllers/ProductsController");




const { register, login, newToken } = require("./controllers/auth.controller");


app.post("/register", register);

app.post("/login", login); 



app.use("/api/order", orderRoute);

app.use("/product", productApi);



app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);
    res.redirect(`http://localhost:3000/?user=${JSON.stringify(user)}&token=${token}`);
  }
);


app.listen(port, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log(`listening on port ${port}`);
  console.log("working");
});
