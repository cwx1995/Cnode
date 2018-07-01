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
    //1.通过字符串传参  /topic/show?id=1
    //.get('/topic/show',topicCtrl.showTopic)
    //id=1&name=ab >>>{id:'1',name:'ab'}
    
    //req.query是对象 express内部吧浏览器传过来的字符串，解析成了对象
    // console.log(req.query.id);

    //2.动态路由
    // .get('/topic/:topicID',topicCtrl.showTopic);
    // console.log(req.params.topicID);
    //获取动态路由传递的ID
   const topicID = req.params.topicID;
   if(isNaN(topicID)){
       //不是一个数字
       res.send('参数错误');
   }
   topicModel.getById(topicID,(err,topic)=>{
       if(err){
           return res.send('服务器内部错误')
       }
       if(topic){
           res.render('topic/show.html',{
               topic
           })
       }else{
           res.send('查询的话题不存在')
       }

   });

};
exports.showEdit=(req,res)=>{
    res.render('topic/edit.html');
};
//修改逻辑
exports.edit=(req,res)=>{
    //方式1 传统方式
    //获取所有版块（分类）
    // categoryModel.getAll((err,categories)=>{
    //     //根据id查询话题
    //     //.get('/topic/:topicID/edit',topicCtrl.showEdit)
    //     const id = req.params.topicID;
    //     if(isNaN(id)){
    //         res.send('参数错误')
    //     }
    //     topicModel.getById(id,(err,topic)=>{
    //         if(err){
    //             return res.send('服务器内部错误')
    //         }
    //         if(topic){
    //             res.render('topic/topic.html',{
    //                 topic,
    //                 user:req.params.user
    //             });
    //         }
    //     });
    // });
//方式2
    //使用ajax方式 html内发送ajax请求
    const id = req.params.topicID;
    req.body.id = id;
    topicModel.update(req.body,(err,isOK)=>{
        if(err){
            return res.json({
                code:500,
                msg:'服务器错误'
            });
        }
        if(isOK){
            res.json({
            code:200,
            msg:'修改成功'    
            });
        }else{
            res.json({
                code:403,
                msg:'修改失败'    
                });
        }
    });
};
//s删除的逻辑
exports.del=(req,res)=>{
    //传统的请求响应式删除方式
    //1.获取url上传的数据
    //获取数据
    const id = req.params.topicID;
    //删除数据
    topicModel.delete(id,(err,isOK)=>{
if(err){
    return res.send('服务器内部错误')
}
if(isOK){
    res.redirect('/');
}else{
    res.send('删除失败')
}
    });
};