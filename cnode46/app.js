const express = require('express');
const app = express();
const PORT = 3000;
//监听端口  
app.listen(PORT,()=>{
    console.log('监听 success');
    
});
app.get('./',(req,res)=>{
    // res.end('suc');
    //end不能传对象，而send可以的
    res.send({
        
    });
    //与send一样 语义有区别而已
    res.json({
        name:'sz',
        age:25
    });
    
})