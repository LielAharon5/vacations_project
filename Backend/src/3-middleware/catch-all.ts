import express ,{Request,Response,NextFunction} from "express"
import logger from "../2-utils/logger"


function catchAll(err:any,request:Request, response:Response,next:NextFunction) {

    // Log the error on the console:
    console.log(err)

    // Log the error to an error log file:
    logger(err.message)

    // Send back the error to the frontend:
    response.status(err.status || 500).send(err.message)

}

export default catchAll