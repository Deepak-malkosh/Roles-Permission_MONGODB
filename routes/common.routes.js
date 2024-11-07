const express = require('express');
const router = express();

const auth  = require('../middleware/auth');

const { categoryAddValidator ,categoryDeleteValidator, categoryUpdateValidator, postCreateValidator} = require('../helpers/adminValidator');

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




module.exports = router