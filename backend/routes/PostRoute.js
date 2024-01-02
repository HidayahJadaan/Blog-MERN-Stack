const router = require('express').Router();
const { createPostCtrl } = require('../controllers/postsController');
const photoUpload = require('../middlewares/photoUpload');
const {verifyToken} = require('../middlewares/verifyToken')

//  api/posts

router.route("/")
.post(verifyToken, photoUpload.single("image"), createPostCtrl);


module.exports = router;