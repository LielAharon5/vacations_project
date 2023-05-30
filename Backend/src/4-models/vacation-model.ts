import Joi, { required } from "joi";
class VacationModel {
    public vacationId: number;
    public vacationName: string;
    public description: string;
    public vacationDate:number;
    public location: string;


    public constructor(vacation:VacationModel){
        this.vacationId = vacation.vacationId
        this.vacationName = vacation.vacationName
        this.description = vacation.description
        this.vacationDate = vacation.vacationDate
        this.location = vacation.location

    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().positive().integer(),
        vacationName: Joi.string().required().min(3).max(20),
        description: Joi.string().required().min(10).max(200),
        vacationDate: Joi.date().required(),
        location: Joi.required()
        
    })

    public validate():string {
        const result = VacationModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationModel