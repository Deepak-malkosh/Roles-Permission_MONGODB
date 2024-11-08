const express = require('express');
const router = express();

const auth  = require('../middleware/auth');

const { categoryAddValidator ,categoryDeleteValidator, categoryUpdateValidator,
       postCreateValidator, postDeleteValidator, postUpdateValidator} = require('../helpers/adminValidator');


const { createUserValidator ,updateUserValidator }  = require('../helpers/validator');      

const categoryController = require('../controller/categoryController');


//category routes
router.post('/add-category', auth, categoryAddValidator, categoryController.addCategory);
router.get('/get-category', auth, categoryController.getCategory);
router.delete('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory);
router.put('/update-category', auth, categoryUpdateValidator, categoryController.updateCategory);


const postController = require('../controller/postController');

//post routes
router.post('/create-post', auth, postCreateValidator, postController.addPost);
router.get('/get-post', auth, postController.getPosts);
router.delete('/delete-post', auth, postDeleteValidator, postController.deletePost);
router.put('/update-post', auth, postUpdateValidator, postController.updatePost);


//User Controller
const userController = require('../controller/userController');


//user routes
router.post('/create-user', auth, createUserValidator, userController.createUser);
router.get('/get-user', auth, userController.getUser);
router.put('/update-user', auth, updateUserValidator, userController.updateUser);



module.exports = router