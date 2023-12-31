import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import cn from "classnames";
import AddComment from "../AddComment";
import CommentList from "../CommentList";
import { DotSpinner } from "@uiball/loaders";
import ThemeContext from "../../Context/theme";
import GenreContext from "../../Context/Genre";
import ScrollToTop from "../ScrollToTop";
import styles from "./styles.module.scss"

export default function BookDetails() {
  const [allComment, setAllComment] = useState([]);
  const [loading, setLoading] = useState();
  const { dark } = useContext(ThemeContext);
  const { genre, id } = useParams();
  const { MyLibrary } = useContext(GenreContext);
  const navigate = useNavigate();

  const selectedBook = MyLibrary[genre].find((book) => book.asin === id);

  const getAllComment = useCallback(() => {
    setLoading(true);
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTk4OTQwNzIsImV4cCI6MTcwMTEwMzY3Mn0.gUU7worP2QWWOjDUEJL6DX-CBtmRDMUiFM7FFCORO4A",
      },
    })
      .then((r) =>r.json())
      .then(setAllComment)
      .catch(() => alert("oh oh"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getAllComment();
  }, [getAllComment]);

  if (!selectedBook) {
    navigate("/404");
  } else {
    return (
      <>
        <ScrollToTop />
        <Container className={cn(dark && "bg-dark", "mt-5")}>
          <Row className="justify-content-center">
            <div className="w-auto">
              <img
                src={selectedBook["img"]}
                alt="book_img"
                style={{ height: 500 }}
              />
            </div>
            <Col xs={12} md={6}>
              <h2>{selectedBook["title"]}</h2>
              <h6>{selectedBook["price"]} €</h6>
              <h3>Recensioni:</h3>
              {loading && (
                <DotSpinner
                  className="spinner"
                  size={40}
                  speed={0.9}
                  color="black"
                />
              )}
              {!loading &&
                (allComment.length === 0 ? (
                  <p className={styles.textCenter}>
                    {"Non ci sono ancora recensioni :("}
                  </p>
                ) : (
                  <CommentList
                    getAllComment={getAllComment}
                    allComment={allComment}
                  />
                ))}
            </Col>
          </Row>
        </Container>
        <Container className="pt-2">
          <AddComment
            id={id}
            getAllComment={getAllComment}
            setLoading={setLoading}
          />
        </Container>
      </>
    );
  }
}
