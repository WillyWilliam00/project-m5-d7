import { Col, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import ThemeContext from "../../Context/theme";
import { Link, useParams } from "react-router-dom";
import cn from "classnames";
import styles from "./styles.module.scss";

export default function SingleBook({ selected, setSelected, ...book }) {
  const { dark } = useContext(ThemeContext);
  const { genre } = useParams();

  return (
    <Col xs={12} sm={6} lg={3} className="d-flex">
      <Card
        className={cn(
          selected === book.asin && styles.select,
          " border border-0",
        )}
      >
        <Card.Img
          style={{ cursor: "pointer", height: 450, objectFit: "cover" }}
          variant="top"
          src={book.img}
          onClick={() => {
            selected !== book.asin ? setSelected(book.asin) : setSelected("");
          }}
          className="img-fluid"
        />

        <Card.Body
          className={cn(
            dark ? "bg-success-subtle" : "bg-info-subtle",
            "d-flex flex-column",
          )}
        >
          <Card.Title>{book.title}</Card.Title>
          <h5>Prezzo: {book.price} €</h5>
          <Link to={`/${genre}/${book.asin}`}>
            <Button variant="info" className="mx-auto my-3 fw-bolder">
              MORE INFO...
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
