const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { categoryAddValidator, categoryDeleteValidator , categoryUpdateValidator, postCreateValidator, 
    postDeleteValidator,  postupdateValidator
    } = require('../helpers/adminValidator');


const { createUserValidator , updateUserValidator, deleteUserValidator, postLikeUnlikeValidator,
     postLikeCountValidator } = require('../helpers/validator');  

const categoryController = require('../controller/categoryController');

const postController = require('../controller/postController');

const userController = require('../controller/userController');

const likeController = require('../controller/likeController');

const checkPermission = require('../middleware/checkPermission');


//category Routes
router.post('/add-category', auth, checkPermission, categoryAddValidator, categoryController.addCategory);
router.get('/get-category', auth, checkPermission, categoryController.getCategories);
router.delete('/delete-category', auth, checkPermission, categoryDeleteValidator, categoryController.deleteCategory);
router.put('/update-category', auth, checkPermission, categoryUpdateValidator, categoryController.updateCategory);



//post Routes
router.post('/create-post', auth, checkPermission, postCreateValidator,  postController.createPost);
router.get('/get-post', auth, checkPermission, postController.getPosts);
router.put('/update-post', auth, checkPermission, postupdateValidator, postController.updatePost);
router.delete('/delete-post', auth, checkPermission, postDeleteValidator, postController.deletePost);


//User Routes
router.post('/create-user', auth, checkPermission, createUserValidator, userController.createUser);
router.get('/get-users', auth, checkPermission, userController.getUsers);
router.put('/update-user', auth, checkPermission, updateUserValidator, userController.updateUser);
router.delete('/delete-user', auth, checkPermission, deleteUserValidator, userController.deleteUser);



//like & Unlike Routes
router.post('/post-like', auth, checkPermission, postLikeUnlikeValidator, likeController.postLike);
router.post('/post-unlike', auth, checkPermission, postLikeUnlikeValidator, likeController.postUnLike);
router.post('/post-like-count', auth, checkPermission, postLikeCountValidator, likeController.postLikeCount);



module.exports = router;