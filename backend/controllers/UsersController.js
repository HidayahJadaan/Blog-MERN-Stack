const asyncHandler = require("express-async-handler");
const { User, ValidateUpdateUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**--------------------------
* @desc Get All Users Profile
* @route /api/users/profile
* @method GET
* @access private (only admin)
-----------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  //    console.log(req.headers.authorization.split(' ')[1]);

  // WE NEED THIS CHECK FOR MANY AREAS IN OUR APP --> MIDDLEWARE --> VerifyTokenAndAdmin
  // if(!req.user.isAdmin){
  //     // 403 --> Forbidden
  //     return res.status(403).json({message: "Not Allowed, Only Admin"})
  // }

  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**--------------------------
* @desc Get User Profile
* @route /api/users/profile/:id
* @method GET
* @access public
-----------------------------*/

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/**--------------------------
* @desc Update User Profile
* @route /api/users/profile/:id
* @method PUT
* @access private (user himself)
-----------------------------*/

module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  //1. Validation
  //2. Hash The Password
  //3. Update the User Profile
  //4. Send Response To The Client

  const { error } = ValidateUpdateUser(req.body);

  if (error) {
    res.status(400).json({ messsge: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  res.status(200).json(updatedUser);
});

/**--------------------------
* @desc Get Users Count
* @route /api/users/count
* @method GET
* @access private (only admin)
-----------------------------*/

module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();

  res.status(200).json(usersCount);
});

/**--------------------------
* @desc Profile photo Upload
* @route /api/users/profile/profile-photo-upload
* @method POST
* @access private (only logged in users)
-----------------------------*/

module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  //  MULTER WAY
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "No File Provided" });
  }

  // 2. Get The Path To The Image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3. Upload To Cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  // console.log(result); --> secure_url + puublic_id
 
  // 4. Get The User From DB
  const user = await User.findById(req.user.id);
  
  // 5. Delete Old Profile Photo If Exists
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  // 6. Change Profile Photo Feild In The DB

  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  
  // 7. Send Response To Client
  res
    .status(200)
    .json({
      message: "Your Profile Photo Uploaded Success",
      profilePhoto: { url: result.secure_url, publicId: result.public_Id },
    });

  // 8. Remove Image From The Images Folder (fs)

  fs.unlinkSync(imagePath);
});
