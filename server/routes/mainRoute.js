const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { get_user, post_user, user_login, get_user_detail, user_forget_password, user_verify_code, user_update_password,
get_news,post_news,get_news_detail, delete_news } = require('../controller/mainController');

// Customer Routes
route.get('/users',get_user);
route.get('/users/:id',get_user_detail);
route.post('/users',upload.single('idCard'),post_user);
route.post('/userlogin',user_login);
route.post('/user/forgot/password',user_forget_password);
route.post('/user/verify/code',user_verify_code);
route.patch('/user/update/password',user_update_password);

// News Routes
route.get('/news',get_news);
route.get('/news/:id',get_news_detail)
route.post('/news',upload.single('newsPhoto'),post_news);
route.delete('/news/:id',delete_news);

module.exports = route;