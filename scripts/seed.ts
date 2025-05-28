import mongoose from "mongoose";
import Category from "../models/Category";
import Listing from "../models/Listing";
import categoriesData from "../data/categories.json";
import listingsData from "../data/listings.json";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/b2b-marketplace";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Category.deleteMany({});
    await Listing.deleteMany({});
    console.log("🧹 Cleared existing categories and listings");

    const insertedCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    const listingsWithIds = listingsData
      .map((listing) => {
        const resolvedCategoryId = insertedCategories.find(
          (el) => el.uid === listing.categoryUid
        )._id;

        return {
          ...listing,
          categoryId: resolvedCategoryId,
        };
      })
      .filter((listing) => listing.categoryId);

    const insertedListings = await Listing.insertMany(listingsWithIds);
    console.log(`✅ Inserted ${insertedListings.length} listings`);

    await mongoose.disconnect();
    console.log("🛑 Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
