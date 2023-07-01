import { UploadedFile } from "express-fileupload";
import Joi from "joi";


class VacationModel {
    public vacationId: number;
    public vacationName: string;
    public description: string;
    public vacationDate:number;
    public location: string;
    public image: UploadedFile;
    public imageName: string


    public constructor(vacation:VacationModel){
        this.vacationId = vacation.vacationId
        this.vacationName = vacation.vacationName
        this.description = vacation.description
        this.vacationDate = vacation.vacationDate
        this.location = vacation.location
        this.image = vacation.image
        this.imageName = vacation.imageName 

    }

    public static validationSchemaNewVacation = Joi.object({
        vacationId: Joi.number().positive().integer(),
        vacationName: Joi.string().required().min(3).max(20),
        description: Joi.string().required().min(10).max(200),
        vacationDate: Joi.date().required(),
        location: Joi.string().required(),
        image: Joi.object().required(),
        imageName: Joi.string().required()
        
    })
    public static validationSchemaUpdatedVacation = Joi.object({
        vacationId: Joi.number().positive().integer(),
        vacationName: Joi.string().min(3).max(20),
        description: Joi.string().min(10).max(200),
        vacationDate: Joi.date(),
        location: Joi.string(),
        image: Joi.object(),
        imageName: Joi.string()
        
    })

    public validateNew():string {
        const result = VacationModel.validationSchemaNewVacation.validate(this)
        return result.error?.message
    }
    public validateUpdate():string {
        const result = VacationModel.validationSchemaUpdatedVacation.validate(this)
        return result.error?.message
    }
}

export default VacationModel