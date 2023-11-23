const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { get_user, post_user, user_login, get_user_detail, user_forget_password, user_verify_code, user_update_password,
get_news,post_news,get_news_detail, delete_news, user_logout, get_waste, get_waste_detail, post_waste, delete_wastes, 
update_news, get_admin, post_admin, get_admin_detail, admin_login, update_waste, reject_user, approve_user, get_announcement, 
post_announcement, 
post_feedback,
get_feedback,
update_announcement,
delete_announcement,
get_collector,
post_collector,
get_collector_detail,
collector_login,
get_schedule,
post_schedule,
get_schedule_detail,
start_collecting,
update_schedule,
get_new_user,update_user} = require('../controller/mainController');

// Customer Routes
route.get('/users',get_user);
route.get('/new/users',get_new_user);
route.get('/users/:id',get_user_detail);
route.post('/users',upload.single('idCard'),post_user);
route.post('/userlogin',user_login);
route.post('/user/forgot/password',user_forget_password);
route.post('/user/verify/code',user_verify_code);
route.patch('/user/update/password',user_update_password);

// Admin Routes
route.get('/admin',get_admin);
route.get('/admin/:id',get_admin_detail);
route.post('/admin',post_admin);
route.post('/adminlogin',admin_login);
route.delete('/admin/rejectuser/:id',reject_user);
route.patch('/admin/approveuser/:id',approve_user);
route.patch('/admin/update/user/:id',update_user);

// News Routes
route.get('/news',get_news);
route.get('/news/:id',get_news_detail)
route.post('/news',upload.single('newsPhoto'),post_news);
route.delete('/news/:id',delete_news);
route.patch('/news/:id',update_news);

// Waste Routes
route.get('/wastes',get_waste);
route.get('/wastes/:id',get_waste_detail);
route.post('/wastes',upload.single('wastePhoto'),post_waste);
route.delete('/wastes/:id',delete_wastes);
route.patch('/wastes/:id',upload.single('wastePhoto'),update_waste);

// Announcement Routes
route.get('/announcements',get_announcement);
route.post('/announcements',post_announcement);
route.patch('/announcements/:id',update_announcement);
route.delete('/announcements/:id',delete_announcement);

// Feedback Routes
route.get('/feedbacks',get_feedback);
route.post('/feedbacks',post_feedback);

// Collector Routes
route.get('/collectors',get_collector);
route.get('/collectors/:id',get_collector_detail);
route.post('/collectors',post_collector);
route.post('/collectorlogin',collector_login);

// Schedule Routes
route.get('/schedules',get_schedule);
route.get('/schedules/:id',get_schedule_detail);
route.post('/schedules',post_schedule);
route.patch('/schedules/:id',start_collecting);
route.patch('/updateschedule/:id',update_schedule);

module.exports = route;