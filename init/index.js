const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config();
const MONGO_URL = "url";

const userIds = [
  "6a3d0e26e51c32fe5c96e2cd",
  "6a3d0e27e51c32fe5c96e2d0",
  "6a3d0e28e51c32fe5c96e2d4",
  "6a3d0e28e51c32fe5c96e2d7",
  "6a3d0e2ae51c32fe5c96e2dd",
  "6a3d0e2ae51c32fe5c96e2e0",
  "6a3d0e2ae51c32fe5c96e2e3",
  "6a3d0e2be51c32fe5c96e2e9",
];

function getRandomOwner() {
  const randomId = userIds[Math.floor(Math.random() * userIds.length)];
  return new mongoose.Types.ObjectId(randomId);
}

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await Listing.deleteMany({});

    const listings = initData.data.map((obj) => ({
      ...obj,
      owner: getRandomOwner(),
    }));

    await Listing.insertMany(listings);

    console.log("Data initialized successfully");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

main();