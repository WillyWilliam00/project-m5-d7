
import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row, } from "react-bootstrap";
import AddComment from "./addComment";
import CommentList from "./commentList";
import { DotSpinner } from "@uiball/loaders";
import ThemeContext from "../Context/theme";
import GenreContext from "../Context/Genre";
import { useNavigate } from "react-router-dom";

export default function BookDetails() {

  const [allComment, setAllComment] = useState([]);
  const [loading, setLoading] = useState();
  const { dark } = useContext(ThemeContext);
  const { genre, id } = useParams()
  const { MyLibrary } = useContext(GenreContext)
 
  const navigate = useNavigate()
  
  // const BooksByGenre = {
  //       fantasy,
  //       history,
  //       horror,
  //       romance,
  //       scifi
  //   }
   const SelectedBook = MyLibrary[genre].find(book => book.asin === id)


  
  const getAllComment = useCallback(() => {
    setLoading(true);
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTg2ODI5NTQsImV4cCI6MTY5OTg5MjU1NH0.HHBtM4-HlPu0aYhgFK4ucJa0J5WmqpZZFSS5KULk3xo",
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json()
        } else {

        }
      })
      .then(setAllComment)
      .catch(() => alert("oh oh"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getAllComment();
  }, [getAllComment]);

 
  if(!SelectedBook) {
    navigate("/404")
  } else {
    return (
      <>
  
  
        <Container className={dark ? "bg-dark" : ""}>
          <Row>
            <Col>
              <img src={SelectedBook["img"]} alt="book_img" style={{ height: 500 }} />
            </Col>
            <Col xs={7}>
              <h2>{SelectedBook["title"]}</h2>
              <h6>{SelectedBook["price"]} €</h6>
              <h3>Recensioni:</h3>
              {loading && (
                <DotSpinner
                  className="spinner"
                  size={40}
                  speed={0.9}
                  color="black"
                />)}
                {!loading &&
                (allComment.length === 0 ? <h3 className={dark ? "dark-mode" : ""}>Non ci sono ancora recensioni!</h3> :
                <CommentList
                  getAllComment={getAllComment}
                  allComment={allComment} />)}
            </Col>
          </Row>
        </Container>
        <Container style={{ paddingTop: "10px" }}>
          <AddComment id={id} getAllComment={getAllComment} />
        </Container>
  
  
      </>
  
  
  
    )
  }

  

}