import UserModel from "../../../Models/UserModel";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const {register, handleSubmit} = useForm<UserModel>()
    const navigate = useNavigate()

async function send(user:UserModel){
    try{
        // await AuthService.Regiser(user)
        navigate("/vacations")
    }
    catch(err:any){
        alert(err.message)
    }
    }

    return (
        <div className="Register">

			<h2>Register Page</h2>

            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="">First Name:</label>
                <input required type="text" {...register("firstName")} />

                <label htmlFor="">Last Name:</label>
                <input required type="text" {...register("lastName")} />

                <label htmlFor="">username:</label>
                <input required type="text" {...register("username")} />            

                <label htmlFor="">password:</label>
                <input required type="text" {...register("password")} />            

                <button>Register</button>   
            </form>
        </div>
    );
}

export default Register;
