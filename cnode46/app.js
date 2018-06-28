//程序的入口
//负责： 配置  监听接口

const express = require('express');
//导入 router 
const router = require('./routes/router')
const app = express();
const PORT = 3000;
//监听端口  
app.listen(PORT,()=>{
    console.log('监听 success');
    
});
app.use(router);

//注册路由

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

