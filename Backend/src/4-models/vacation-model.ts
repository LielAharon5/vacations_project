class VacationModel {
    public vacationId: number;
    public vacationName: string;
    public description: string;
    public vacationDate:number;
    public locationState: string;
    public latitude: number;
    public longitude: number;

    public constructor(vacation:VacationModel){
        this.vacationId = vacation.vacationId
        this.vacationName = vacation.vacationName
        this.description = vacation.description
        this.vacationDate = vacation.vacationDate
        this.locationState = vacation.locationState
        this.latitude = vacation.latitude
        this.longitude = vacation.longitude

    }
}

export default VacationModel