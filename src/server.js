import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config() //lay duoc gia tri trong file env

const app = express();
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

initWebRoutes(app)

app.listen(PORT,()=>{
    console.log('JWT backend is ruing on the port = ' + PORT)
})