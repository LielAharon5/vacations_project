import  Jwt from "jsonwebtoken";
import { Request } from "express";
import UserModel from "../4-models/user-model";
import RoleModel from "../4-models/role-model";
import crypto from "crypto";


const secretKey = "LielAharonProject"

// create token
function getNewToken(user:UserModel): string {

    delete user.password;

    const container = {user}
    const options = {expiresIn: "12h"}
    const token = Jwt.sign(container,secretKey,options)
    return token
}

// verify token
function verifyToken(request:Request): Promise<boolean> {
    return new Promise<boolean>((resolve,reject) =>{
        try {
            const header = request.headers.authorization
            if(!header){
                resolve(false)
                return
            }
            
            const token = header.substring(7)
            if(!token){
                resolve(false)
                return
            }

            Jwt.verify(token, secretKey, err =>{
                if(err){
                    resolve(false)
                    return
                }
                resolve(true)
            })

        } catch (err:any) {
            reject(err)
        }
    })
}

async function verifyAdmin(request:Request) {

    const isLoggedIn = await verifyToken(request)
    if(!isLoggedIn) return false

    const header = request.headers.authorization
    const token = header.substring(7)
    const container:any = Jwt.decode(token)
    
    const user:UserModel = container.user

    return user.role === RoleModel.Admin
}

const salt = "MyProjectIsTheBest";

function hash(plainText: string): string {

    if(!plainText) return null;

    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hash,

}