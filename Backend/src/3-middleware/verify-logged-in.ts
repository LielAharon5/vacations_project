import {Request, Response, NextFunction} from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-model";

async function verifyLoggedIn(request:Request,response:Response,next:NextFunction){
    try {
        const isValid = await cyber.verifyToken(request)
        if(!isValid) throw new UnauthorizedErrorModel("you MUST to login to continue")
    next()  

    } catch (err:any) {
        next(err)
    }
}
export default verifyLoggedIn