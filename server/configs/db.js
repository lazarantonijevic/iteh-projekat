const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb+srv://lazar:sifra123@cluster0.zvutxut.mongodb.net/");
};
