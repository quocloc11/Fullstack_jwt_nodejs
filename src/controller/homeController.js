import userService from '../service/userService'
const handleHelloword = (req,res)=>{
    return res.render("home.ejs")//render la dung view
}
const handleUserPage =async (req,res)=>{
    let userList=await userService.getUserList()
    await userService.deleteUser(6)
    return res.render("user.ejs",{userList})
}
const handleCreateNewUser=(req,res)=>{
    let email=req.body.email
    let password=req.body.password
    let username=req.body.username

    userService.createNewUser(email,password,username)
    res.redirect("/user") // duong link de ko sang trang moi

}

const handleDeleteUser =async (req,res)=>{
    console.log('check id',req.params.id)

    await userService.deleteUser(req.params.id)
    res.redirect("/user") // duong link de ko sang trang moi
}
module.exports= {
    handleHelloword,handleUserPage,handleCreateNewUser,handleDeleteUser
}