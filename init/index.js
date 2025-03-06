const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main()
    .then(() => {
        console.log("Connection to DB successful");
        initDB();
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        console.log("Initializing database...");
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: '6758107cfcd43ec98c2501c9' }))
        await Listing.insertMany(initData.data);
        console.log("Data Was Initialized Successfully");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
}

initDB();


