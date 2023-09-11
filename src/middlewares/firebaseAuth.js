const admin = require("firebase-admin");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const { userService, authService } = require("../services");
require("../../firebase-info")


const firebaseAuth = async (req,res,next) =>{
    return new Promise( async (resolve, reject) => {
    try {
        let idToken;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            idToken = req.headers.authorization.split(' ')[1];
        }
        if(!idToken){
            return next(new AppError('Please pass firebase auth token ',400));
        }
        let decodedIdToken;
        try{
            decodedIdToken = await admin.auth().verifyIdToken(idToken,true)
        }catch(error){
            console.log(error)
            next(error);
            return
        }
        console.log('firebase decoded token', decodedIdToken);
        const user = await authService.getUserByFirebaseUId(decodedIdToken.uid);
        if(!user) {
            if(req.path === "/register") {
                req.newUser = decodedIdToken;
            } else reject(new ApiError(httpStatus.NOT_FOUND, "User doesn't exist. Please create account"));
        } else {
            if(user.isBlocked) { throw new ApiError(httpStatus.FORBIDDEN, "User is blocked"); }
            if(user.isDeleted) { throw new ApiError(httpStatus.GONE, "User doesn't exist anymore"); }
            req.user = user;
        }
        resolve(); 
    } catch(err) {
        console.log("FirebaseAuthError:", err);
        reject(new ApiError(httpStatus.UNAUTHORIZED, "Failed to authenticate"))
    }
    }).then(() => next()).catch((err) => next(err));
}


module.exports = firebaseAuth
