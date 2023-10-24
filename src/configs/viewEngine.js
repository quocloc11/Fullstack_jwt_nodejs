import express from "express"


/**
 * 
 * @param {e} app -express app
 */
const configViewEngine = (app)=>{
    app.use(express.static('./src/public'))
    app.set('view engine', 'ejs')
    app.set('views','./src/views')

}

export default configViewEngine;

//export default configViewEngine; chi xuat 1 lan tham chiếu