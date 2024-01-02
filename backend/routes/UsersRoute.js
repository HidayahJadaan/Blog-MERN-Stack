const router = require('express').Router();
const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl} = require('../controllers/UsersController');
const validateObjectID = require('../middlewares/validateObjectID');
const {  verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken');


//  api/users/profile
router.route('/profile')
.get(verifyTokenAndAdmin ,getAllUsersCtrl);
//  api/users/profile/:id
router.route('/profile/:id')
.get( validateObjectID ,getUserProfileCtrl)
.put(validateObjectID, verifyTokenAndOnlyUser, updateUserProfileCtrl);


//  api/users/count
router.route('/count')
.get(verifyTokenAndAdmin ,getUsersCountCtrl);



module.exports = router;