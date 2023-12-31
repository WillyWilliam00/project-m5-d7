import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

function AddComment({ id, getAllComment, setLoading }) {
  const [text, setText] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = {
      comment: text,
      rate: rate,
      elementId: id,
    };

    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTk4OTQwNzIsImV4cCI6MTcwMTEwMzY3Mn0.gUU7worP2QWWOjDUEJL6DX-CBtmRDMUiFM7FFCORO4A",
        
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.ok) {
        getAllComment();
        alert("Salvato!");
        setText("");
        setRate("");
      } else {
        alert("oh oh");
      }
    });
  };

  return (
    <Row className="mt-3">
      <Col xs={12} md={6} className="m-auto">
        <Form onSubmit={handleSubmit}>
          <h4 className={styles.textCenter}>Inserisci una recensione:</h4>
          <Form.Group className="mb-3 mt-2" controlId="text">
            <Form.Label>Cosa ne pensi?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrivi la tua recensione"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stars">
            <Form.Label>Quanto ti è piaciuto?</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            <Button variant="success" type="submit">
              Invia la tua recensione!
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default AddComment;
