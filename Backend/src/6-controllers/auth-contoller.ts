import express, {Request, Response, NextFunction} from "express";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verifyAdmin";

const router = express.Router()



//  register - http://localhost:3001/api/auth/register
router.post("/auth/register", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        response.status(201).json(token)
    }
    catch(err:any) {
        next(err)
    }
})

// Login - http://localhost:3001/api/auth/login  
router.post("/auth/login", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const credentials = new CredentialsModel(request.body)
        const token = await authLogic.login(credentials)
        response.json(token)
    }
    catch(err:any) {
        next(err)
    }
})
// DELETE http://localhost:3001/api/users
router.delete("/users/:userId",[verifyLoggedIn, verifyAdmin],async(request:Request,response:Response,next:NextFunction)=>{
    try {
const userId = +request.params.userId
await authLogic.deleteUser(userId)
response.sendStatus(204)
}
catch(err:any) {
next(err)
}
})

// GET all users - for checks only http://localhost:3001/api/Users
router.get("/users", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const users = await authLogic.getAllUsers()
        response.json(users)
    }
    catch(err:any) {
        next(err)
    }
})

export default router