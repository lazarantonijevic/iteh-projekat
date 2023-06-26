const express = require("express");
const cors = require("cors");
const session = require('express-session');


const connect = require("./configs/db");

require('dotenv').config();
const app = express();
app.use(express.json());

let port = process.env.PORT ||   8080;




const paymentRoutes = require("./controllers/payment");


const productApi = require("./controllers/ProductsController");

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

const passport = require("./configs/google-oauth");





app.use(cors());


const { register, login, newToken } = require("./controllers/auth.controller");


app.post("/register", register);

app.post("/login", login); 



app.use("/api/payment/", paymentRoutes);

app.use("/product", productApi);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "",
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    console.log("user", user);
    const token = newToken(user);
    console.log("user", user);
    return res.send({ user, token });
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
