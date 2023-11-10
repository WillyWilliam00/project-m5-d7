import { Row, Col, Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import ThemeContext from "../../Context/theme";
import { useContext } from "react";
import cn from "classnames";


function Footer() {

  const {dark} = useContext(ThemeContext)
  return (
    <Container fluid className={cn( dark ? styles.bgDark : styles.bgLight , "text-light mt-5")}>
      <Row className="d-flex justify-content-center pt-5">
        <Col xs={12} sm={4}>
          <div className={styles.footerDiv}>
            <h4>Contatti</h4>
            <p>Indirizzo: Via Example, 12345, Città</p>
            <p>Email: info@example.com</p>
            <p>Telefono: +39 0123 456789</p>
          </div>
        </Col>
        <Col xs={12} sm={4}>
          <div className={styles.footerDiv}>
            <h4>Link Utili</h4>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Chi siamo</li>
              <li>Servizi</li>
              <li>Contatti</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
