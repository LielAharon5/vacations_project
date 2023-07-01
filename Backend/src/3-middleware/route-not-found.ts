import express ,{Request,Response,NextFunction} from "express"
import { RouteNotFoundErrorModel } from "../4-models/error-model"


function routeNotFound(request:Request, response:Response,next:NextFunction) {
   
    // what is the route that the user search for
    const err = new RouteNotFoundErrorModel(request.originalUrl)

    next(err)

}

export default routeNotFound