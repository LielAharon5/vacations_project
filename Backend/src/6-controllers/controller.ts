import express, {Request, Response, NextFunction} from "express";
import logic from "../5-logic/logic";
import VacationModel from "../4-models/vacation-model";

const router = express.Router()

// GET http://localhost:3001/api/vacations
router.get("/vacations", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const vacations = await logic.getAllVacations()
        response.json(vacations)
    }
    catch(err:any) {
        next(err)
    }
})

// POST http://localhost:3001/api/vacations
router.post("/vacations", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const store = new VacationModel(request.body)
        const addedStore = await logic.addVacation(store)
        response.status(201).json(addedStore)
    }
    catch(err:any) {
        next(err)
    }
})

// DELETE http://localhost:3001/api/vacations
router.delete("/vacations/:vacationId", async(request:Request,response:Response,next:NextFunction)=>{
    try {
const vacationId = +request.params.vacationId
await logic.deleteVacation(vacationId)
response.sendStatus(204)
}
catch(err:any) {
next(err)
}
})

export default router