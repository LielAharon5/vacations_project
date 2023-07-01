import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
// import CredentialsService from "../../../Services/CredentialsService";
import { NavLink } from "react-router-dom";


function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentialsModel>()
    const navigate = useNavigate()

async function send(Credentials:CredentialsModel){
    try{
        // await CredentialsService.Login(Credentials)
        navigate("/vacations")
    }
    catch(err:any){
        alert(err.message)
    }
    }

    return (
        <div className="Login">

            <h2>Login Page:</h2>
            <div className="FormContainer">
                <form onSubmit={handleSubmit(send)}>
                    <label htmlFor="">User Name:</label>
                    <input required type="text" {...register("username")} />

                    <label htmlFor="">Description:</label>
                    <input required type="text" {...register("password")} />       

                    <button>Login</button>
    
                </form>
                
                <NavLink to="/Register"><button>Register</button></NavLink>  
                 
            </div>


        </div>
    );
}

export default Login;
