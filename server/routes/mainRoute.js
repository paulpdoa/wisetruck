const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { get_user, post_user, user_login, get_user_detail, user_forget_password, user_verify_code, user_update_password } = require('../controller/mainController');

route.get('/users',get_user);
route.get('/users/:id',get_user_detail);
route.post('/users',upload.single('idCard'),post_user);
route.post('/userlogin',user_login);
route.post('/user/forgot/password',user_forget_password);
route.post('/user/verify/code',user_verify_code);
route.patch('/user/update/password',user_update_password);

module.exports = route;