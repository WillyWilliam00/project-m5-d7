import SingleComment from "./SingleComment"

export default function CommentList({allComment, getAllComment}) {
    
    return (
        <div style={{ overflow: "auto", height: 350}}>
                {allComment.map((comment, i) => (
                    
                    <SingleComment getAllComment={getAllComment} commmentText={comment.comment} commentRate={comment.rate} key={i} commentId={comment._id} />
                    
                ))}
          </div>  
    )
}