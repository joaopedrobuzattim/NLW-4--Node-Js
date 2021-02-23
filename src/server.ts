import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';


const app = express();

app.use(express.json())

const port = process.env.PORT || 3333;

app.use(router);

app.listen(port, ()=>{
    console.log('Server running!!');
})