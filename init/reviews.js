const mongoose = require("mongoose");

// ---------------- MongoDB ----------------
const MONGO_URI =
  "url";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);

// ---------------- Generic Models ----------------
const userSchema = new mongoose.Schema({}, { strict: false });
const reviewSchema = new mongoose.Schema({}, { strict: false });
const listingSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model("User", userSchema, "users");
const Review = mongoose.model("Review", reviewSchema, "reviews");
const Listing = mongoose.model("Listing", listingSchema, "listings");

// ---------------- Comments ----------------
const comments = [
  "Absolutely loved this place! Clean, cozy and exactly like the photos.",
  "Great stay. The host was very responsive and helpful.",
  "Perfect location with all amenities nearby.",
  "Beautiful interiors and very peaceful surroundings.",
  "Would definitely book this place again.",
  "Everything was well maintained and spotless.",
  "Excellent experience from check-in to check-out.",
  "Comfortable beds and spacious rooms.",
  "Amazing property for a weekend getaway.",
  "Fantastic hospitality. Highly recommended.",
  "Very safe locality and easy transportation.",
  "Worth every penny. Five-star experience.",
  "The house was neat and beautifully decorated.",
  "Host provided clear instructions for check-in.",
  "Perfect stay for families.",
  "Had an amazing vacation here.",
  "Everything exceeded our expectations.",
  "The place looked even better in person.",
  "Highly recommended for couples.",
  "Peaceful and relaxing environment.",
  "Very clean bathrooms and kitchen.",
  "Wonderful experience overall.",
  "Loved the balcony view.",
  "Nearby restaurants were excellent.",
  "Great value for money.",
  "Fast Wi-Fi and comfortable workspace.",
  "The neighborhood felt very safe.",
  "One of the best stays I've had.",
  "Would happily recommend this property.",
  "Fantastic experience. Will return soon."
];

// ---------------- Rating ----------------
function randomRating() {
  const r = Math.random();

  if (r < 0.60) return 5;
  if (r < 0.90) return 4;
  return 3;
}

// ---------------- Seeder ----------------
async function seedReviews() {
  try {

    const users = await User.find({});
    const listings = await Listing.find({});

    if (users.length === 0) {
      console.log("❌ No users found");
      return;
    }

    // Optional: Remove all previous reviews
    await Review.deleteMany({});

    for (const listing of listings) {

      // Clear review references
      await Listing.updateOne(
        { _id: listing._id },
        { $set: { reviews: [] } }
      );

      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
      const reviewCount = Math.floor(Math.random() * 6) + 5;

      for (let i = 0; i < reviewCount; i++) {

        const user = shuffledUsers[i % shuffledUsers.length];

        const review = await Review.create({
          comment:
            comments[Math.floor(Math.random() * comments.length)],
          rating: randomRating(),
          author: user._id,
        });

        // Push review into listing
        await Listing.updateOne(
          { _id: listing._id },
          {
            $push: {
              reviews: review._id,
            },
          }
        );
      }

      console.log(`✅ ${listing.title}`);
    }

    console.log("\n🎉 Reviews Added Successfully");

  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

seedReviews();