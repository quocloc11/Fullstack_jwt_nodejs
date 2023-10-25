import express from 'express'
import homController from '../controller/homeController'
const router = express.Router()

/**
 * 
 * @param {*} app express app
 */

const initWebRoutes = (app) =>{
    router.get("/",homController.handleHelloword)
    router.get("/user",homController.handleUserPage)
    router.post("/users/create-user",homController.handleCreateNewUser)
    router.post("/delete-user/:id",homController.handleDeleteUser)

    return app.use('/',router)
}

export default initWebRoutes