const express = require('express');
const route = express.Router();
const { get_user, post_user, user_login, get_user_detail } = require('../controller/mainController');

route.get('/users',get_user);
route.get('/users/:id',get_user_detail);
route.post('/users',post_user);
route.post('/userlogin',user_login);

module.exports = route;