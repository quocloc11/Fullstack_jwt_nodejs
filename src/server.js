import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config() //lay duoc gia tri trong file env
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

initWebRoutes(app)

app.listen(PORT,()=>{
    console.log('JWT backend is ruing on the port = ' + PORT)
})