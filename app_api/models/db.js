var mongoose = require("mongoose");
var dbURI = "mongodb://localhost/mekanbul";
mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {
  console.log(dbURI + "adresine baglandi");
});
mongoose.connection.on("error", function () {
  console.log("baglantida hata oldu");
});
mongoose.connection.on("disconnected", function () {
  console.log("baglanti kesildi");
});
process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("uygulama kapatildi");
  process.exit(0);
});
require("./venue");
