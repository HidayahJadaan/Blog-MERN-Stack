const asyncHandler = require("express-async-handler");
const {User} = require("../models/User");

/**--------------------------
* @desc Get All Users Profile
* @route /api/users/profile
* @method GET
* @access private (only admin)
-----------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async (req,res)=>{
//    console.log(req.headers.authorization.split(' ')[1]);
   

// WE NEED THIS CHECK FOR MANY AREAS IN OUR APP --> MIDDLEWARE --> VerifyTokenAndAdmin
// if(!req.user.isAdmin){
//     // 403 --> Forbidden
//     return res.status(403).json({message: "Not Allowed, Only Admin"})
// }


const users = await User.find();
    res.status(200).json(users)

});
