
//导入公共模块和md5
//  const db = require('./db_helper');
//加密密码
const md5 = require('md5');
const userModel = require('../models/user');
//暴露回调函数给router
//展示登录页面
exports.showSignin = (req, res) => {
    res.render('signin.html');
};
//登录逻辑
exports.signin = (req, res) => {
    //验证用户的输入
    //验证密码和邮箱是否都正确
    //查找邮箱的那一行
    //    db.query(
    //        'select * from `users` where `email`=?',
    //        req.body.email,
    //        (err,result)=>{
    //            if(err){
    //                return res.send('服务器内部错误');
    //            }
    //            //判断邮箱是否存在 存在证明正确
    //            if(result.length<=0){
    //                return res.json({
    //                    code:400,
    //                    msg:'邮箱不存在'
    //                });
    //            }
    //            //若邮箱存在 判断密码是否匹配
    //         //定义用户输入的密码 md5转一下
    //         const password = md5(req.body.password);
    //         if(password!==result[0].password){
    //             return res.json({
    //                 code:401,
    //                 msg:'密码不正确'
    //             });
    //         }
    //         //如果用ajax  没办法使用res.redirect()
    //         //success
    //         res.json({
    //             code:200,
    //             msg:'登录成功'

    //         });
    //        }
    //    );

    // 2.1 验证用户的输入
  // TODO
  // 2.2 验证邮箱和密码是否正确
  userModel.getByEmail(req.body.email,(err,user)=>{
      if(err){
        return res.send('服务器内部错误');
      }
      if(!user){
          return res.json({
              code:401,
              msg:'邮箱不存在'
          });
      }
      // 判断密码是否正确
      const password = md5(req.body.password);
      if(password==user.password){
          // 记录session 保存状态
          delete user.password;
          //存储session中的用户名
          req.session.user=user;
          // 是跳转 还是输出json？？
          res.json({
              code:200,
              msg:'登录成功'
          });
      }else{
          res.json({
              code:402,
              msg:'密码错误'
          });
      }
  });

};
//展示注册页面
exports.showSignup = (req, res) => {
    res.render('signup.html');
};
//注册逻辑
exports.signup = (req, res) => {

    //添加数据前 要做验证
    //验证邮箱是否重复
    // db.query(
    //     //查找邮箱那一行的sql语句
    //     'select * from `users` where `email`=?',
    //     //邮箱，用户输入的
    //     req.body.email,
    //     //错误和获取结果
    //     (err,result)=>{
    //         if(err){
    //             //返回错误
    //             return res.send('服务器内部错误');
    //         }
    //         //输出结果调试
    //         console.log(result);
    //         //如果数据长度不为0 证明拿到了数据 数据重复
    //         if(result.length>0){
    //             //render 渲染页面  并提示
    //             res.render('signup.html',{
    //                 msg:'邮箱已存在'
    //             });
    //             return;
    //         }
    //         //昵称验证  和上面的一样
    //         db.query(
    //             'select * from `users` where `nickname`=?',
    //             req.body.nickname,
    //             (err,result)=>{
    //                 if(err){
    //                     return res.send('服务器内部错误');
    //                 }
    //                 if(result.length>0){
    //                     res.render('signup.html',{
    //                         msg:'昵称已存在'
    //                     });
    //                     return;
    //                 }
    //                 //如果不重复 走到这一步 插入数据
    //                 //获取post数据  配置body-parser 在app.js配置
    //                 req.body.createdAt=new Date();
    //                 req.body.password = md5(req.body.password);
    //                 db.query(
    //                     'insert into `users` set ?',
    //                     req.body,
    //                     (err,result)=>{
    //                         if(err){
    //                             throw err;
    //                         }
    //                     //如果受影响的行为1 即添加成功
    //                         if(result.affectedRows === 1){
    //                             //重定向页面
    //                             res.redirect('/signin');
    //                         }else{
    //                             //渲染页面
    //                             res.render('signup.html',{
    //                                 msg:'注册失败'
    //                             });
    //                         }
    //                     }
    //                 );


    //             }
    //         );
    //     }
    // );

    userModel.getByEmail(req.body.email, (err, user) => {
        if (err) {
            return res.send('wrong');
        }
        if(user){
            return res.render('signup.html',{
                msg:'邮箱已存在'
            });
        }
        //验证昵称
        userModel.getByNickname(req.body.nickname, (err, user) => {
            if (err) {
                return res.send('wrong 1 ');
            }
            if(user){
                return res.render('signup.html',{
                    msg:'昵称已存在'
                });
            }
            //如果没问题 插入用户
            req.body.createdAt = new Date();
            req.body.password = md5(req.body.password);
            userModel.createUser(req.body, (err, isOK) => {
                if (isOK) {
                    res.redirect('/signin');
                } else {
                    res.render('signup.html', {
                        msg: '注册失败'
                    });
                }
            })
        });
    });
};

//退出登录逻辑
exports.signout = (req, res) => {
   // 销毁session
  // delete req.session.user;
  req.session.destroy();
  //跳转到登录
  res.redirect('/signin');
};