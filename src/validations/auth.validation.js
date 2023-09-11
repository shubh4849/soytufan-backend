const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    dob: Joi.date().iso(),
    phone: Joi.string().trim(),
    email: Joi.string().trim(),
    firebaseUid: Joi.string().trim(), 
    firebaseSignInProvider: Joi.string().trim(), 
    userType: Joi.string().trim(), 
    bio: Joi.string().trim(), 
    profilePic: Joi.string().trim(), 
    preferences: Joi.object({
      notificationEnabled: Joi.boolean(),
      locationShared: Joi.boolean(),
    }).unknown(false)
    // firebaseSignInProvider: Joi.string().trim()
  })
}

const updateProfile = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    dob: Joi.date().iso(),
    bio: Joi.string().trim(),
    profilePic: Joi.string().trim(),
    preferences: Joi.object({
      notificationEnabled: Joi.boolean(),
      locationShared: Joi.boolean(),
    }).unknown(false),
    selectedCategory: Joi.array().items(Joi.string().hex().length(24)),
  }),
};

module.exports = {
  register,
  updateProfile
}