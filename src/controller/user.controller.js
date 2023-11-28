import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from './../models/user.model.js';


const registerUser = asyncHandler(async(req, res) => {
    // get user details from frontend
    // validation -not empty
    // check user alredy exists: username , email
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object- create entry in db
    // remove passoword and refresh token field from response
    // check for user creation
    // return response 
    const { username, email, password, fullName } = req.body;
    if([fullName, email, password, username].some((field) => field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }
    const existedUser = await User.findOne({email: email.toLowerCase()
        // $or: [{username}, {email}] // check multiple fields
    });
    if(existedUser) {
        throw new ApiError(409, 'User already exist')
    }
    const avatarLocalPAth = req.files?.avatar[0]?.path;
    const coverImageLocalPath = (req.files?.coverImage) ? req.files?.coverImage[0]?.path : null;

    if(!avatarLocalPAth) {
        throw new ApiError(400, 'Avatar is required')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPAth);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, 'Avatar file is required')
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email: email.toLowerCase(),
        password,
        username
    });

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User registered successfully')
    )
})

export {
    registerUser
}