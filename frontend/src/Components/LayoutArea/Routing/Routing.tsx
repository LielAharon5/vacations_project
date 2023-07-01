import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Insert from "../../DataArea/Insert/Insert";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../DataArea/Login/Login";
import Register from "../../DataArea/Register/Register";
import Home from "../../DataArea/Home/Home";
import ContactUs from "../../DataArea/ContactUs/ContactUs";
import Reports from "../../DataArea/Reports/Reports";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/vacations" element={<Home/>}/>
                <Route path="/add-vacation" element={<Insert/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
