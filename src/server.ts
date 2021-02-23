import express from 'express';

const app = express();

const port = process.env.PORT || 3333;

app.get('/', (req,res)=>{
    res.json({
        message: "Hello!"
    })
})

app.post('/', (req,res)=>{
    res.json({
        message: 'Hello ( Post method)'
    })
})

app.listen(port, ()=>{
    console.log('Server running!!');
})