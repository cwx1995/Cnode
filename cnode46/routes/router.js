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
.get('/topic/create',showCreate)
.post('/topic/create',create)
.get('/topic/:topicID',show)
.get('/topic/:topicID/edit',showEdit)
.post('/topic/:topicID/edit',edit)
.post('/topic/:topicID/delete',del)


