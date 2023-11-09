import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {

    return (
    
    <div className="d-flex flex-column align-items-center " style={{height: "100vh"}}>
        <h1>ERROR 404 NOT FOUND</h1>
        <h5>oh oh.. riprova!</h5>
        <Link to={"/"}><Button variant= "success" >TORNA ALLA HOME PAGE</Button></Link> 
    </div>
    
    
    
    
    
    
    
    
    )
    
    
}