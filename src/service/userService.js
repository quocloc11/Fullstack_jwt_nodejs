import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise';
import bluebird from 'bluebird'
import db from '../models/index'



const salt = bcrypt.genSaltSync(10)

// create the connection to database



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword,salt) //bawm password
    return hashPassword
}

const createNewUser=async (email,password,username)=>{
    let hashPass=hashUserPassword(password)
   // const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})
    try{
        await db.User.create({
            username:username,
            email:email,
            password:hashPass
        })
         //tao moi user sql
      //const [rows,fields] =await connection.execute(' INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email,hashPass,username])
    }catch(error){

        console.log('check err',error)
    }
    


}
const getUserList =async ()=>{
    //test relishioship
    let newUser =await db.User.findOne({
        where:{ id: 1},
        attributes:["id","username","email"],
        include:{model: db.Group,attributes:["name","description"]},
        raw:true,
        nest:true
    })

    // let roles = await db.Group.findOne({
    //     where:{ id: 1},
    //     include: {model: db.Role},
    //     raw:true,
    //     nest:true
    // })

    let r =await db.Role.findAll({
        include:{model: db.Group,where: {id:1}},
        
        raw:true,
        nest:true
    })

    console.log('check ',newUser)
    console.log('check roles',r)

    let users =[ ];
    users = await db.User.findAll();
    return users
    
    // const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

   
    // try{

    //     const [rows,fields] =await connection.execute(' Select * from user ')
    //     return rows
    // }catch(error){
    //     console.log('check err',error)
    // }
}

const deleteUser =async (userId)=>{
    await db.User.destroy({
        where:{id: userId}
    })
    
    // const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    // try{
    //     const [rows,fields] =await connection.execute(' DELETE FROM user WHERE id=?',[id])
    //     return rows
    // }catch(error){
    //     console.log('check err',error)
    // }
}
const getUserById=async (id)=>{
   let user = {}
   user =await db.User.findOne({
    where:{id:id}
   })
   return user.get({plain:true})
   console.log('user',user,"id=",id)
    // const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    // try{
    //     const [rows,fields] =await connection.execute('Select * FROM user WHERE id=?',[id])
    //     return rows
    // }catch(error){
    //     console.log('check err',error)
    // }

}

const updateUserInfor=async (email,username,id)=>{
    await db.User.update(
        { email: email,username:username }, {
        where: {
          id: id
        }
      });
    // const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    // try{
    //     const [rows,fields] =await connection.execute('UPDATE user SET email = ?, username = ?  WHERE id = ? ' , [email,username,id])
    //     return rows
    // }catch(error){
    //     console.log('check err',error)
    // }
}
module.exports={
    createNewUser,getUserList,deleteUser,getUserById,updateUserInfor
}