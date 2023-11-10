import { Row, Container, Col, Tab, Tabs } from "react-bootstrap";
import { useContext, useState } from "react";
import SingleBook from "../SingleBook";
import GenreContext from "../../Context/Genre";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss"
import cn from "classnames"
import ThemeContext from "../../Context/theme";

export default function TableBook({ name }) {
  const usingQuery = (book) =>
    book.title.toLowerCase().includes(name.toLowerCase());
  const [selected, setSelected] = useState("");
  const { genre } = useParams();
  const navigate = useNavigate();
  const { MyLibrary } = useContext(GenreContext);
  const BooksByChoise = MyLibrary[genre];
  const {dark} = useContext(ThemeContext)
 

  return (
    <Container className="my-5">
      <Row>
        <Col className={cn(dark && "dark-mode-tabs")}>
          <Tabs
            id="books"
            activeKey={genre ? genre : ""}
            onSelect={(genre) => {
              navigate(`/${genre}`);
            }}
            className="mb-3"
            justify
          >
            {Object.keys(MyLibrary).map((genre, i) => (
              <Tab eventKey={genre} title={genre} key={i} />
            ))}
          </Tabs>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Row className="row-gap-5">
            {BooksByChoise ? (
              BooksByChoise.filter(usingQuery).map((book) => (
                <SingleBook
                  img={book.img}
                  title={book.title}
                  key={book.asin}
                  asin={book.asin}
                  price={book.price}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))
            ) : (
              <h1 className={styles.textCenter}>SCEGLI UN GENERE</h1>
            )}
          </Row>
        </Col>
      </Row>
      
    </Container>
  );
}
