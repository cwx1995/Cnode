//程序的入口
//负责： 配置  监听接口

const express = require('express');
//引包  模板
const expressArtTemplate=require('express-art-template');

//导入 router 
const router = require('./routes/router');
//导入body-parser 
const bodyParser = require('body-parser');
const app = express();
//设置接口为3000 常量
const PORT = 3000;
//监听端口  
app.listen(PORT,()=>{
    console.log('监听 success');
    
});
//处理静态资源 -- 下载bootstrap@3.3.7  jquery
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
//配置模板引擎
app.engine('html',expressArtTemplate);
app.use(bodyParser.urlencoded({extended:false}));
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

