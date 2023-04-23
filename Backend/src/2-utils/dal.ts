import mysql from "mysql"
import appConfig from "./app-config"


// Create a pool of connections to MySQL:
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
})

function execute(sql: string):Promise<any> {
    return new Promise<any>((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        }) 
    })
}

export default {
    execute
}