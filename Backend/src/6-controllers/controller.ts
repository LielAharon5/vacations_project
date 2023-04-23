import express, {Request, Response, NextFunction} from "express";
import logic from "../5-logic/logic"
import StoreModel from "../4-models/vacation-model";

const router = express.Router()

router.get("/stores", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const stores = await logic.getAllStores()
        response.json(stores)
    }
    catch(err:any) {
        next(err)
    }
})

router.post("/stores", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const store = new StoreModel(request.body)
        const addedStore = await logic.addStore(store)
        response.status(201).json(addedStore)
    }
    catch(err:any) {
        next(err)
    }
})

router.delete("/stores/:storeId", async(request:Request,response:Response,next:NextFunction)=>{
    try {
const storeId = +request.params.storeId
await logic.deleteStore(storeId)
response.sendStatus(204)
}
catch(err:any) {
next(err)
}
})

export default router