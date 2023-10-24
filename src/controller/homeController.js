import userService from '../service/userService'
const handleHelloword = (req,res)=>{
    return res.render("home.ejs")//render la dung view
}
const handleUserPage = (req,res)=>{
    return res.render("user.ejs")
}
const handleCreateNewUser=(req,res)=>{
    let email=req.body.email
    let password=req.body.password
    let username=req.body.username

    userService.getUserList()
    //userService.createNewUser(email,password,username)

    return res.send('sss')
}
module.exports= {
    handleHelloword,handleUserPage,handleCreateNewUser
}