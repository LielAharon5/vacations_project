import {Request, Response, NextFunction} from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-model";


async function verifyAdmin(request:Request,response:Response,next:NextFunction){
    try {
        const isAdmin = await cyber.verifyAdmin(request)
        if(!isAdmin) throw new UnauthorizedErrorModel("only admin can do it!")
        next()  

    } catch (err:any) {
        next(err)
    }
}
export default verifyAdmin