import { Row, Container, Col, Tab, Tabs } from "react-bootstrap";
import { useContext, useState } from "react";
import SingleBook from "./SingleBook";
import GenreContext from "../Context/Genre";
import { useNavigate, useParams } from "react-router-dom";


export default function TableBook({ name }) {
    const usingQuery = book => book.title.toLowerCase().includes(name.toLowerCase())
    const [selected, setSelected] = useState("")
    const { genre } = useParams()
    const navigate = useNavigate()
    const { MyLibrary } = useContext(GenreContext)
    const BooksByChoise = MyLibrary[genre]
   

    return (

        <Container className="my-5">
            <Row>
                <Col>
                    <Tabs
                        id="books"
                        activeKey={genre ? genre : ""}
                        onSelect={(genre) => {navigate(`/${genre}`)}}
                        className="mb-3"
                        justify
                    >
                        {Object.keys(MyLibrary).map((genre, i ) => 
                            <Tab eventKey={genre} title={genre} key={i} />
                        )}
                    </Tabs></Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Row className="row-gap-5">
                        {BooksByChoise ? BooksByChoise.filter(usingQuery).map(book => (
                            <SingleBook img={book.img} title={book.title} key={book.asin} asin={book.asin} selected={selected} setSelected={setSelected} />
                        )) : <h1 style={{textAlign: "center"}}>Scegli un genere!</h1>}
                    </Row>
                </Col>
               
            </Row>

        </Container>



    );
}
    



