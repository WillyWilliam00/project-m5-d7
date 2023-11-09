import {Col, Card, Button} from "react-bootstrap";
import { useContext } from "react";
import ThemeContext from "../Context/theme";
import { Link, useParams } from "react-router-dom";


export default function SingleBook({img, title, asin, selected, setSelected}) {

    const {dark} = useContext(ThemeContext)
    const { genre } = useParams()


    return (
        
        <Col xs={12} sm={6} lg={3}>
        <Card className={selected !== asin ? "border border-0" : "select border border-0"}>
            <Card.Img  
               style={{cursor: "pointer"}} variant="top" 
               src={img} 
               onClick={() => {
                if(selected !== asin){
                    
                    setSelected(asin)
                } else {
                    
                    setSelected("")
                }}} 
               className="img-fluid"
           />
           
            <Card.Body className={dark ? "bg-success-subtle d-flex flex-column" : "bg-info-subtle d-flex flex-column"}>
                <Card.Title>{title}</Card.Title>    
                <Link to={`/${genre}/${asin}`}><Button variant="info" className="mx-auto my-3 fw-bolder">MORE INFO...</Button></Link>       
            </Card.Body>
             
        </Card>
    </Col>
    
       
    )
}

