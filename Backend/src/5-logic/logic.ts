import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"
import VacationModel from "../4-models/vacation-model"
import UserModel from "../4-models/user-model"

//  ---------------- vacations logic ---------------------------------
async function getAllVacations(): Promise<VacationModel[]>{
    const sql = "SELECT * FROM vacations"
    const vacation = await dal.execute(sql)
    return vacation

}
// add new vacation
async function addVacation(vacation:VacationModel): Promise<VacationModel>{
    const errors = vacation.validate()
    if(errors) throw new ValidationErrorModel(errors)
    const sql = `
                INSERT INTO vacations VALUES(
                    DEFAULT,
                    '${vacation.vacationName}',
                    '${vacation.description}',
                    '${vacation.vacationDate}',
                    '${vacation.location}')
                    `
                const info:OkPacket = await dal.execute(sql)
                vacation.vacationId = info.insertId
                return vacation
}
// delete vacation
async function deleteVacation(vacationId:number):Promise<void>{
    const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`
    const info: OkPacket = await dal.execute(sql)
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId)

}

//  ---------------- Users logic ---------------------------------

async function getAllUsers(): Promise<UserModel[]>  {
    const sql = "SELECT * FROM users"
    const users = await dal.execute(sql)
    return users
}



    export default {
        getAllVacations,
        addVacation,
        deleteVacation, 
        getAllUsers,
}