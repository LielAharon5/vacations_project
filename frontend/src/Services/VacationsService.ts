import VacationModel from "../Models/VacationModel"
import appConfig from "../Utils/AppConfig"
import axios from "axios"

class VacationsService {

    public async getAllVacations():Promise<VacationModel[]>{
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl)
        const Vacation = response.data
        return Vacation
    }

    public async addVacation(Vacation:VacationModel): Promise<VacationModel> {
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, Vacation)
        const addedVacation = response.data
        return addedVacation
    }

    public async deleteVacation(VacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + VacationId)
    } 

    public async updateVacation(Vacation:VacationModel): Promise<VacationModel> {
        const response = await axios.patch<VacationModel>(appConfig.vacationsUrl, Vacation)
        const updatedVacation = response.data
        return updatedVacation
    }

}

const vacationsService = new VacationsService()

export default vacationsService