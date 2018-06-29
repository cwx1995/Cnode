
const db = require('./db_helper');
//增加一个用户
exports.createUser=(user,callback)=>{
db.query(
    'insert into `users` set ?',
    user,
    (err,results)=>{
    if(err){
        return callback(err);
    }

    //返回查询到的数据
    
    // callback(null,result);
    if(results.affectedRows>0){
        callback(null,true);
    }else{
        callback(null,false);
    }
    }
);
};



//根据email查询用户
exports.getByEmail=(email,callback)=>{
    //固定格式  sql语句  参数  回调（err，results）
db.query(
    'select * from `users` where `email`=?',
    email,
    (err,results)=>{
        if(err){
            return callback(err);
        }
        //email要求是唯一的，不能够重复的
            //所以根据email只能查询到一个用户的信息
        if(results.length>0){
         callback(null,results[0]);
        }else{
            callback(null,null);
        }
       
    }
);
};

//根据nickname查询用户
exports.getByNickname=(nickname,callback)=>{
    //固定格式  sql语句  参数  回调（err，results）
db.query(
    'select * from `users` where `nickname`=?',
    nickname,
    (err,results)=>{
        if(err){
            return callback(err);
        }
        if(results.length>0){
            //nickname要求是唯一的，不能够重复的
            //所以根据nackname只能查询到一个用户的信息
            callback(null,results[0]);
           }else{
               callback(null,null);
           }
          
    }
);
};