const { User } = require("../models");
const Category = require("../models/category.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

async function createUser(user) {
    return await User.create(user);
}

async function getUserByFirebaseUId(id) {
    return await User.findOne({ firebaseUid: id });
}

async function checkUserExists(email) {
    // Use the User model to check if a user with the specified email exists
    const user = await User.findOne({ email });

    // Return true if a user with the email exists, otherwise return false
    return !!user;
}

async function updateUserProfile(userId, updatedData) {
    try {
      // Find the user by their ID and update their profile
      console.log('updateUserProfile - userId:', userId);
      console.log('updateUserProfile - updatedData:', updatedData);
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedData,
        {
          new: true, // Return the updated user
        }
      );
  
      if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
  
      return updatedUser;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Unable to update user profile"
      );
    }
  }
  

async function getCategoryListing(user) {
try {
    // Fetch all categories from the database
    const allCategories = await Category.find({});

    // Fetch the user's profile to get their selected categories
    const userProfile = await User.findById(user._id);

    // Extract the selectedCategory array from the user's profile
    const selectedCategoryIds = userProfile.selectedCategory || [];

    // Map through all categories and add a "selected" flag to each category
    const categoryList = allCategories.map((category) => ({
    _id: category._id,
    name: category.name,
    selected: selectedCategoryIds.includes(category._id.toString()),
    }));

    return categoryList;
} catch (error) {
    throw error; // Handle the error appropriately in your application
}
}
  
module.exports = {
    createUser,
    getUserByFirebaseUId,
    checkUserExists,
    updateUserProfile,
    getCategoryListing
};