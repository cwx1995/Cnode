//router.js职责 设置路由规则
//router路由对象
//route 路由规则

const express = require('express');
//导入各种回调函数 代码分离
const indexCtrl = require('../controllers/index');
const categoryCtrl = require('../controllers/category');
const topicCtrl = require('../controllers//topic');
const userCtrl = require('../controllers/user');
//创建路由对象
const router = express.Router();
//导出模块 被app引用
module.exports = router;
//设置路由规则
//index 使用index中的回调
router.get('/',indexCtrl.showIndex);
  
//用户路由
router
.get('/signin',userCtrl.showSignin)
.post('/signin',userCtrl.signin)
.get('/signup',userCtrl.showSignup)
.post('/signup',userCtrl.signup)
.post('/signout',userCtrl.signout)
//话题相关
router
.get('/topic/create',topicCtrl.showCreate)
.post('/topic/create',topicCtrl.create)
.get('/topic/:topicID',topicCtrl.showTopic)
.get('/topic/:topicID/edit',topicCtrl.showEdit)
.post('/topic/:topicID/edit',topicCtrl.edit)
.get('/topic/:topicID/delete',topicCtrl.del)


