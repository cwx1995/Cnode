const categoryModel = require('../models/category');
const topicModel = require('../models/topic');
//显示添加话题的页面
exports.showCreate=(req,res)=>{
    categoryModel.getAll(
        (err,categories)=>{
            res.render('topic/create.html',{
                categories,
                user:req.session.user
            });
        }
    );
   
};
//添加话题的逻辑 接口
exports.create=(req,res)=>{
   //TODO 验证用户输入
   //在session中拿到用户id 先验证有没有session
   if(!req.session.user){
       res.json({
           code:403,
            msg:'请登录'
       });
   }
   req.body.userId = req.session.user.id;
   req.body.createdAt = new Date();
   topicModel.createTopic(req.body,(err,isOK)=>{
       if(err){
           return res.json({
               code:500,
               msg:'服务器内部错误'
           });
        }
           if(isOK){
                res.json({
                  code:200,
               msg:'成功'  
               });
           }else{
               res.json({
                   code:400,
                   msg:'话题添加失败'
               });
           }

       
   });
};
exports.showTopic=(req,res)=>{
    res.send('showTopic');
};
exports.showEdit=(req,res)=>{
    res.send('showEdit');
};
exports.edit=(req,res)=>{
    res.send('edit');
};
exports.del=(req,res)=>{
    res.send('del');
};