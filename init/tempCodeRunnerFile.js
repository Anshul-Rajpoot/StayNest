const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config();
const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
   owner: new mongoose.Types.ObjectId("6a038af7fb91342d590d3069"),
  }));

  await Listing.insertMany(initData.data);

  console.log("data was initialized");
  await mongoose.connection.close();
}

main().catch((err) => console.log(err));
