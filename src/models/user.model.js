
const mongoose = require("mongoose");
const { paginate } = require("./plugins/paginate");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    phone:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    profilePic:{
        type:String,
    },
    userType:{
        type:String,
        enum: ["user","creator"],
        default: "user"
    },
    dob:{
        type:Date
    },
    bio:{
        type:String
    },
    firebaseUid:{
        type:String,
        required:true,
        unique:true
    },
    firebaseSignInProvider:{
        type:String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isDeleted:{  // to soft delete user. if(isDeleted = true), then user is deleted.
        type: Boolean,
        default:false
    },
    preferences: {
        type: {
            notificationEnabled: Boolean,
            locationShared: Boolean
        },
        default: {
            notificationEnabled: false,
            locationShared: false,
        }
    },
    selectedCategory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Reference to the Categories model
        },
      ],      
  },
    {timestamps:true}
);

userSchema.plugin(paginate);

module.exports.User = mongoose.model("User",userSchema);