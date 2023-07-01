import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"
import VacationModel from "../4-models/vacation-model"
import filesHandler from "../2-utils/files-handler"

async function getAllVacations(): Promise<VacationModel[]>{
    
    const sql = "SELECT * FROM vacations"
    const vacation = await dal.execute(sql)
    return vacation
}

async function addVacation(vacation:VacationModel): Promise<VacationModel>{

    const errors = vacation.validateNew()
    if(errors) throw new ValidationErrorModel(errors)

    if(vacation.image){
    await filesHandler.addNewPicture(vacation)
    }

    const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?)"
    const info:OkPacket = await dal.execute(sql,[vacation.vacationName,vacation.description,vacation.vacationDate,vacation.location,vacation.imageName])
    vacation.vacationId = info.insertId
    return vacation
}

async function deleteVacation(vacationId:number):Promise<void>{

    await filesHandler.deletePicture(vacationId)

    const sql = "DELETE FROM vacations WHERE vacationId = ?"
    const info: OkPacket = await dal.execute(sql,[vacationId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId)


}

async function updateVacation(vacation:VacationModel): Promise<VacationModel> {

    const errors = vacation.validateUpdate();
    if (errors) throw new ValidationErrorModel(errors);

    await filesHandler.deletePicture(vacation.vacationId)
    
    await filesHandler.addNewPicture(vacation)

    const sql = "UPDATE vacations SET vacationName=?, description=?, vacationDate=?, location=?, imageName=? WHERE vacationId = ?"
    const info: OkPacket = await dal.execute(sql,[vacation.vacationName,vacation.description,vacation.vacationDate,vacation.location,vacation.imageName,vacation.vacationId])
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);

    return vacation;
}

async function getReports(): Promise<void>{
    
const reports =  5
    return 
}


    export default {
        getAllVacations,
        addVacation,
        deleteVacation, 
        updateVacation,
        getReports

}

