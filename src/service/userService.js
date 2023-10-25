import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise';
import bluebird from 'bluebird'




const salt = bcrypt.genSaltSync(10)

// create the connection to database



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword,salt) //bawm password
    return hashPassword
}

const createNewUser=async (email,password,username)=>{
    let hashPass=hashUserPassword(password)
    const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})
    try{
         //tao moi user
      const [rows,fields] =await connection.execute(' INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email,hashPass,username])
    }catch(error){

        console.log('check err',error)
    }
    


}
const getUserList =async ()=>{
    const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

   
    try{

        const [rows,fields] =await connection.execute(' Select * from user ')
        return rows
    }catch(error){
        console.log('check err',error)
    }
}

const deleteUser =async (id)=>{
    const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    try{
        const [rows,fields] =await connection.execute(' DELETE FROM user WHERE id=?',[id])
        return rows
    }catch(error){
        console.log('check err',error)
    }
}
const getUserById=async (id)=>{
    const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    try{
        const [rows,fields] =await connection.execute('Select * FROM user WHERE id=?',[id])
        return rows
    }catch(error){
        console.log('check err',error)
    }
}

const updateUserInfor=async (email,username,id)=>{
    const connection =await mysql.createConnection({host:'localhost',user:'root',database:'jwt',Promise:bluebird})

    try{
        const [rows,fields] =await connection.execute('UPDATE user SET email = ?, username = ?  WHERE id = ? ' , [email,username,id])
        return rows
    }catch(error){
        console.log('check err',error)
    }
}
module.exports={
    createNewUser,getUserList,deleteUser,getUserById,updateUserInfor
}