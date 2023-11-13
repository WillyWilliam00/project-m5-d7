import { useContext } from "react";
import { Col, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import ThemeContext from "../../Context/theme";
import styles from "./styles.module.scss";
import cn from "classnames";

export default function SingleComment({ getAllComment, ...comment }) {
  const { dark } = useContext(ThemeContext);

  const deleteComment = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/comments/${comment.commentId}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTk4OTQwNzIsImV4cCI6MTcwMTEwMzY3Mn0.gUU7worP2QWWOjDUEJL6DX-CBtmRDMUiFM7FFCORO4A",
        },
        method: "DELETE",
      },
    ).then((response) => {
      if (response.ok) {
        alert("Eliminato con successo!");
        getAllComment();
      } else {
        alert("oh oh");
      }
    });
  };

  return (
    <>
      <Col
        className={`d-flex justify-content-between align-items-start mx-auto pt-2 my-1 ${styles.borderTopLightGray}`}
      >
        <Col xs={10}>
          <div className="d-flex justify-content-between mb-2">
            <p className="m-0 fw-bolder">Rating:</p>
            <p className="m-0 fw-bolder">{comment.commentRate}</p>
          </div>
          <div>
            <p className="mb-3 fw-bolder">Recensione:</p>
            <p
              className={cn(
                dark && "text-light",
                `my-3 ps-2 ${styles.boxTextReview}`,
              )}
            >
              {comment.commmentText}
            </p>
          </div>
        </Col>
        <Button variant="outline-danger" onClick={deleteComment} value={"Ciao"}>
          <Trash />
        </Button>
      </Col>
    </>
  );
}
