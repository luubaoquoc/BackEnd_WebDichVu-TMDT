const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://sonmartin2003:Yeyetiger2003@products.eoildal.mongodb.net/WebDichVu_DB"
    );
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
