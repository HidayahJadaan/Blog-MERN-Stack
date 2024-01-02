const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const {Post, ValidateCreatePost, ValidateUpdatePost} = require('../models/Post');
const {cloudinaryUploadImage} = require ('../utils/cloudinary')

/**--------------------------
* @desc Create New Post
* @route /api/posts
* @method POST
* @access private (only logged in user)
-----------------------------*/

module.exports.createPostCtrl = asyncHandler(async (req, res)=>{
// 1. Validation For Image
// 2. Validation For Data
// 3. Upload Photo
// 4. Create New Post And Save It To DB
// 5. Send Response To The Client
// 6. Remove Image Form The Server

// STEP 1:

if(!req.file){
    return res.status(400).json({message:"No Image Provided"});
}

// STEP 2:
const {error} = ValidateCreatePost(req.body);
if(error){
    return res.status(400).json({message: error.details[0].message});
}

// STEP 3:
const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
const result = await cloudinaryUploadImage(imagePath);


// STEP 4:
// const post = new Post({
//     title: req.body.title,

// });

// await post.save();

const post = await Post.create({
    title: req.body.title,
description: req.body.description,
category:req.body.category,
user: req.user.id,
image: {
    url: result.secure_url,
    publicId: result.public_id,
}
})

// STEP 5:

res.status(200).json(post);

// STEP 6: 
fs.unlinkSync(imagePath);
});

