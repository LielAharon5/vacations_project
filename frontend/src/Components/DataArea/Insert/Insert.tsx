import VacationsModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./Insert.css";
import  {useForm}  from "react-hook-form";
import {useNavigate} from 'react-router-dom/dist'


function Insert(): JSX.Element {
    
    const {register, handleSubmit} = useForm<VacationsModel>()
    const navigate = useNavigate()

    async function send(vacation:VacationsModel){
    try{
        await vacationsService.addVacation(vacation)
        navigate("/vacations")
    }
    catch(err:any){
        alert(err.message)
    }
    }
    return (
        <div className="Insert">
            <h2>Insert New Vacations:</h2>

            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="">Vacations Name:</label>
                <input required type="text" {...register("vacationName")} />

                <label htmlFor="">Description:</label>
                <input required type="text" {...register("description")} />       

                <label htmlFor="">Date:</label>
                <input required type="text" {...register("vacationDate")} />    

                <label htmlFor="">Location:</label>
                <input required type="text" {...register("location")} />    
                    
                <button>Add</button>   
            </form>

        </div>
    );
}

export default Insert;
