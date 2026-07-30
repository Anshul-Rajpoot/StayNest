const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Replace with your MongoDB Atlas URL
const MONGO_URL =
  "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/test";

mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Create a temporary schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

// Add passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

const users = [
    { username: "RahulVerma", email: "rahul.verma@gmail.com" },
    { username: "PriyaSharma", email: "priya.sharma@gmail.com" },
    { username: "AmitKumar", email: "amit.kumar@gmail.com" },
    { username: "NehaGupta", email: "neha.gupta@gmail.com" },
    { username: "ArjunSingh", email: "arjun.singh@gmail.com" },
    { username: "PoojaPatel", email: "pooja.patel@gmail.com" },
    { username: "VivekYadav", email: "vivek.yadav@gmail.com" },
    { username: "KavyaJain", email: "kavya.jain@gmail.com" },
    { username: "RohitMishra", email: "rohit.mishra@gmail.com" },
    { username: "SnehaReddy", email: "sneha.reddy@gmail.com" }
];

async function seedUsers() {

    try {

        await User.deleteMany({});

        for (const u of users) {

            await User.register(
                new User({
                    username: u.username,
                    email: u.email
                }),
                "password123"
            );

            console.log(`${u.username} created`);
        }

        console.log("\n✅ 10 Users Inserted Successfully");

    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

seedUsers();