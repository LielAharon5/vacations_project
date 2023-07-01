import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./Home.css";
import VacationService from "../../../Services/VacationsService";

function Home(): JSX.Element {
    const [Vacations,setVacations] = useState<VacationModel[]>([])

    // useEffect(()=>{
    //     VacationService.getAllVacations()
    //         .then(Vacations => setVacations(Vacations))
    //         .catch(err => alert(err.message))
    // },[])
/*
    async function deleteVacation(VacationId:number){
        try{

            const ok = window.confirm("Are you sure?");
            if(!ok) return;

            await VacationService.deleteVacation(VacationId)
            const index = Vacations.findIndex(s=>s.VacationId===VacationId)
            Vacations.splice(index,1)
            const duplicatedVacations = [...Vacations]
            setVacations(duplicatedVacations)
        }
        catch(err:any){
            alert(err.message)
        }
    }
    */return (
       
        <div className="Home">
		    <h2>List Of Vacations:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vacation Name:</th>
                            <th>Description:</th>
                            <th>Address:</th>
                            <th>Geolocation:</th>
                            <th>Delete:</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {Vacations.map(s =>
                            <tr key={s.VacationId}>
                                <td>{s.VacationName}</td>
                                <td>{s.description}</td>
                                <td>{s.address}</td>
                                <td>{s.latitude},{s.longitude}</td>
                                <td>
                                     <button onClick={() => deleteVacation(s.VacationId)}> ❌</button>
                                </td>
                            </tr>)
                        }
                    </tbody> */}
                </table>
        </div>
    ); 
}

export default Home;


