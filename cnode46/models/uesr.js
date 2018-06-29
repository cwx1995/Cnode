//增加一个用户
const db = require('./db_helper');
exports.createUser=(user,callback)=>{
db.query(
    'insert into `users` set ?',
    user,
    (err,result)=>{
    if(err){
        return callback(err);
    }
    callback(null,result);
    }
);
}



//根据email查询用户