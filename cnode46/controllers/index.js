//exports 导出回调函数 被router 使用
const topicModel = require('../models/topic');
const moment = require('moment');
exports.showIndex = (req,res)=>{
    topicModel.getAll((err,topics)=>{
        if(err){
            return res.send(err);
        }
        res.render('index.html',{
            user:req.session.user,
            topics,
            moment
        });
        
    });
};