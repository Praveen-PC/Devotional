const mysql=require('mysql2/promise')
require('dotenv').config()


const con=mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password

})

module.exports=con