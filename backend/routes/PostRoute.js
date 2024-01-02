const router = require('express').Router();
const { createPostCtrl, getAllPostsCtrl, getSinglePostsCtrl, getPostCountCtrl, deletePostCtrl } = require('../controllers/postsController');
const photoUpload = require('../middlewares/photoUpload');
const validateObjectID = require('../middlewares/validateObjectID');
const {verifyToken} = require('../middlewares/verifyToken')

//  api/posts

router.route("/")
.post(verifyToken, photoUpload.single("image"), createPostCtrl)
.get(getAllPostsCtrl);

//  api/posts/:id

router.route("/count").get(getPostCountCtrl);
router.route("/:id").get(validateObjectID ,getSinglePostsCtrl)
.delete(validateObjectID, verifyToken, deletePostCtrl);


module.exports = router;