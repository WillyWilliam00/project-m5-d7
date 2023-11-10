import { Nav, Navbar, Button } from "react-bootstrap";
import ThemeContext from "../../Context/theme";
import { useContext } from "react";
import { MoonFill, BrightnessHighFill } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import SwitchMode from "../SwitchMode";

function MyNavBar({ name, setName }) {
  const { dark, setDark } = useContext(ThemeContext);
  const { genre } = useParams();

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className={`${styles.opacity} ps-1`}
      bg={dark ? "success-subtle" : "info-subtle"}
      data-bs-theme={dark ? "light" : "dark"}
    >
      <Navbar.Brand
        href="#home"
        className="d-flex justify-content-center align-items-center"
      >
        <img
          alt="book"
          src="https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className={`d-inline-block align-top rounded-4 ${styles.navImg}`}
        />
        <span className="fw-bolder ps-2">EPICBOOKS</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to={`/${genre}`} className="nav-link">
            Home
          </Link>
        </Nav>
        <label className="ms-auto pe-5">
          <input
            className={styles.inputText}
            name="TitleName"
            placeholder="Signore degli Anelli.."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        
          <SwitchMode onClick={() => setDark(!dark)} />
        

        <Button
          className={`${styles.DarkLightBtn} mx-5`}
          variant={dark ? "primary" : "secondary"}
          onClick={() => setDark(!dark)}
        >
          {dark ? (
            <BrightnessHighFill className="text-warning" />
          ) : (
            <MoonFill />
          )}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
