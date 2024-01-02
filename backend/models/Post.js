const mongoose = require ('mongoose');

const Joi = require('joi');

// POST SCHEMA

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength:12,
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
       
    },
    image: {
        type: Joi.object,
        default: {
            url: "",
            publicId: null
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
}, {
    timestamps: true,
});

// POST MODEL
const Post = mongoose.model("Post", PostsSchema);

// Validate Create Post
function ValidateCreatePost(Obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(12).required(),
        category: Joi.string().trim().required(),
       
    })
    return schema.validate(Obj);
}

// Validate Update Post
function ValidateUpdatePost(Obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(12),
        category: Joi.string().trim(),
       
    })
    return schema.validate(Obj);
}


module.exports ={
    Post,
    ValidateCreatePost,
    ValidateUpdatePost
}