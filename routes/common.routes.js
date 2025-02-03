const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { categoryAddValidator, categoryDeleteValidator , categoryUpdateValidator, postCreateValidator, 
    postDeleteValidator,  postupdateValidator
    } = require('../helpers/adminValidator');


const { createUserValidator , updateUserValidator, deleteUserValidator, postLikeUnlikeValidator,
     postLikeCountValidator } = require('../helpers/validator')   

const categoryController = require('../controller/categoryController');

const postController = require('../controller/postController');

const userController = require('../controller/userController');

const likeController = require('../controller/likeController');


//category Routes
router.post('/add-category', auth, categoryAddValidator, categoryController.addCategory);
router.get('/get-category', auth, categoryController.getCategories);
router.delete('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory);
router.put('/update-category', auth, categoryUpdateValidator, categoryController.updateCategory);



//post Routes
router.post('/create-post', auth, postCreateValidator,  postController.createPost);
router.get('/get-post', auth,  postController.getPosts);
router.put('/update-post', auth, postupdateValidator, postController.updatePost);
router.delete('/delete-post', auth, postDeleteValidator, postController.deletePost);


//User Routes
router.post('/create-user', auth, createUserValidator, userController.createUser);
router.get('/get-users', auth, userController.getUsers);
router.put('/update-user', auth, updateUserValidator, userController.updateUser);
router.delete('/delete-user', auth, deleteUserValidator, userController.deleteUser);



//like & Unlike Routes
router.post('/post-like', auth, postLikeUnlikeValidator, likeController.postLike);
router.post('/post-unlike', auth, postLikeUnlikeValidator, likeController.postUnLike);
router.post('/post-like-count', auth, postLikeCountValidator, likeController.postLikeCount);



module.exports = router;