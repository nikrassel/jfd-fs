import React, { useEffect } from "react"
// import PropTypes from "prop-types"
import Comment from "./comment"
import CreateComment from "./createComment"
import { orderBy } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment, getComments, getCommentsLoadingStatus, loadCommentsList } from "../../../store/comments"
import { useParams } from "react-router-dom"

const UserComments = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())
    function handleDelete(idToDelete) {
        dispatch(deleteComment(idToDelete))
        // API.comments.remove(idToDelete)
        // setComments((prevState) => prevState.filter((elem) => elem._id !== idToDelete))
    }
    function updateComments(newComment) {
        console.log(newComment)
        // setComments((prevState) => ([
        //     ...prevState,
        //     newComment
        // ]))
    }
    if (comments) {
        const sortedComments = orderBy(
            comments,
            ["created_at"],
            ["desc"]
        )
        return (
            <>
                <div className="card mb-2">
                    <div className="card-body">
                        <CreateComment pageId={userId} upDateComments={updateComments}/>
                    </div>
                </div>
                {comments.length > 0 &&
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
                            {!isLoading
                                ? sortedComments.map((item) => (
                                    <Comment postData={item} onDelete={handleDelete} key={item._id}></Comment>
                                ))
                                : "Loading"
                            }
                        </div>
                    </div>}
            </>
        )
    }
}

// UserComments.propTypes = {
//     userId: PropTypes.string
// }
export default UserComments
