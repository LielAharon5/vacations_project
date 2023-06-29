import express, {Request, Response, NextFunction} from "express";
import vacationLogic from "../5-logic/vacations-logic";
import VacationModel from "../4-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verifyAdmin";


const router = express.Router()

// GET http://localhost:3001/api/vacations ------------------ get all
router.get("/vacations", verifyLoggedIn, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const vacations = await vacationLogic.getAllVacations()
        response.json(vacations)
    }
    catch(err:any) {
        next(err)
    }
})

// POST http://localhost:3001/api/vacations ----------------- add vacation
router.post("/vacations",[verifyLoggedIn, verifyAdmin], async(request:Request,response:Response,next:NextFunction)=>{
    try {
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)
        const addedVacation = await vacationLogic.addVacation(vacation)
        response.status(201).json(addedVacation)
    }
    catch(err:any) {
        next(err)
    }
})

// DELETE http://localhost:3001/api/vacations  ---------------delete vacation
router.delete("/vacations/:vacationId",[verifyLoggedIn, verifyAdmin], async(request:Request,response:Response,next:NextFunction)=>{
    try {
const vacationId = +request.params.vacationId
await vacationLogic.deleteVacation(vacationId)
response.sendStatus(204)
}
catch(err:any) {
next(err)
}
})

// PUT http://localhost:3001/api/vacations ----------------- update vacation
router.patch("/vacations/:vacationId",[verifyLoggedIn, verifyAdmin], async(request:Request,response:Response,next:NextFunction)=>{
    try {
        request.body.vacationId = +request.params.vacationId
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)
        const updatedVacation = await vacationLogic.updateVacation(vacation)
        response.json(updatedVacation)
    }
    catch(err:any) {
        next(err)
    }
})



export default router