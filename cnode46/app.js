//程序的入口
//负责： 配置  监听接口

const express = require('express');
//引包  模板
const expressArtTemplate=require('express-art-template');

//导入 router 
const router = require('./routes/router');
//导入body-parser 
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');
const app = express();
//设置接口为3000 常量
// const PORT = 3000;
//监听端口  
app.listen(config.port,()=>{
    console.log('监听 success'+ config.port);
    
});
//处理静态资源 -- 下载bootstrap@3.3.7  jquery
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
//配置模板引擎
app.engine('html',expressArtTemplate);
app.use(bodyParser.urlencoded({extended:false}));


var db = config.database;
// 把session保存到mysql中
var options = {
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database
};

var sessionStore = new MySQLStore(options);
// 配置session
app.use(session({
  key: 'sessionid',  // 修改sessionid的名称
  secret: 'keyboard cat',  // 对sessionid 进行加密 
  resave: false,   // 强制重新存储服务器上的session数据  
  store: sessionStore,   // 配置把session数据存储到mysql
  saveUninitialized: true  // 即使不写session 也会生成sessionid
}));
//注册路由
app.use(router);



// app.get('./',(req,res)=>{
//     // res.end('suc');
//     //end不能传对象，而send可以的
//     res.send({
        
//     });
//     //与send一样 语义有区别而已
//     res.json({
//         name:'sz',
//         age:25
//     });
    
// });

