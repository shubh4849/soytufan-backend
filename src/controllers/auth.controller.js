const { authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const loginUser = catchAsync(async (req, res) => {
    res.status(200).send({ data: req.user });
});

// const registerUser = catchAsync(async (req, res) => {
//     // Check if a user with the provided email already exists
//     const userExists = await authService.checkUserExists(req.body.email);
  
//     if (userExists) {
//       return res.status(401).send({ message: "User already exists" });
//     }
  
//     // Define user object based on the JSON data
//     const userObj = {
//       name: req.body.name,
//       dob: req.body.dob,
//       phone: req.body.phone,
//       email: req.body.email,
//       firebaseUid: "AdnpoerYOlcBFolCcs8O2xiwV3E3",
//       userType: req.body.userType,
//       firebaseSignInProvider: "password",
//       preferences: {
//         notificationEnabled: req.body.preferences?.notificationEnabled || false,
//         locationShared: req.body.preferences?.locationShared || false,
//       },
//     };
  
//     // Create the user in your database
//     const user = await authService.createUser(userObj);
  
//     // Respond with the created user data
//     return res.status(201).send({ data: user });
//   });
  
  const registerUser = catchAsync(async (req,res) => {
    if(req.user) {
        res.status(401).send({ message: "User already exist"});
    } else {
      const check = await authService.checkUserExists(req.body.email);
       if(!check) {
        if(req.newUser.firebase.sign_in_provider === "phone") {
            userObj = { phone: req.newUser.phone_number, ...req.body }
        } else {
            userObj = {
                name: req.newUser.name,
                email: req.newUser.email,
                ...req.body
            }    
        }
        userObj = { 
            ...userObj,
            firebaseUid: req.newUser.uid,
            firebaseSignInProvider: req.newUser.firebase.sign_in_provider
        }
        const user = await authService.createUser(userObj);
        res.status(201).send({ data: user });
      } else {
        res.status(401).send({ message: "Email already taken"});
      }
    }
});

const updateProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const { profilePic, bio, selectedCategory, dob, name } = req.body;

  const updatedData = {}; // Create an empty object to hold the updated data
  
  // Check if each field is provided in the request body and add it to the updatedData object if it exists
  if (profilePic !== undefined) {
    updatedData.profilePic = profilePic;
  }
  
  if (bio !== undefined) {
    updatedData.bio = bio;
  }
  
  if (selectedCategory !== undefined) {
    updatedData.selectedCategory = selectedCategory;
  }
  
  if (dob !== undefined) {
    updatedData.dob = dob;
  }
  
  if (name !== undefined) {
    updatedData.name = name;
  }
  
  try {
    const updatedUser = await authService.updateUserProfile(user._id, updatedData);
  
    res.status(200).json({
      status: true,
      message: "User profile updated.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Unable to update user profile.",
    });
  }
});

const categoryListing = catchAsync(async (req, res) => {
  const user = req.user;
  
  // Call the authService function to get the list of categories
  const categoryList = await authService.getCategoryListing(user);

  // Respond with the list of categories
  res.status(200).json({
    status: true,
    categories: categoryList,
  });
});



module.exports = {
    loginUser,
    registerUser,
    updateProfile,
    categoryListing
}