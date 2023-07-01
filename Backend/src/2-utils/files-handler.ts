import { v4 } from "uuid"
import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"
import fs from "fs"
import VacationModel from "../4-models/vacation-model"



async function addNewPicture(vacation:VacationModel):Promise<void> {

    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = v4() + extension
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName)
    delete vacation.image
    return 
}

async function deletePicture(vacationId:number):Promise<void>{

    const sql = "SELECT imageName FROM vacations WHERE vacationId = ?"
    const info:OkPacket = await dal.execute(sql,[vacationId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId)
    
    const imageName = info[0].imageName
    if (fs.existsSync("./src/1-assets/images/" + imageName )) {
        fs.unlinkSync("./src/1-assets/images/" + imageName )
    }

}

export default{
    addNewPicture,
    deletePicture
}