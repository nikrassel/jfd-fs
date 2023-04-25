import React from "react"
import PropTypes from "prop-types"
import { timeCreator } from "../../../utils/timeCreator"
import { useSelector } from "react-redux"
import { getCurrentUserId, getUserById } from "../../../store/users"

const Comment = ({ postData, onDelete }) => {
    const currentUserId = useSelector(getCurrentUserId())
    const user = useSelector(getUserById(postData.userId))
    const postDate = timeCreator(postData.created_at)
    if (user) {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img src={user.image}
                                alt="avatar"
                                className="rounded-circle shadow-1-strong me-3"
                                width="65"
                                height="65"/>
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            {`${user.name} - `}
                                            <span className="small">
                                                {postDate}
                                            </span>
                                        </p>
                                        {currentUserId === postData.userId &&
                                            <button className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() => onDelete(postData._id)}>
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        }
                                    </div>
                                    <p className="small mb-0">
                                        {postData.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Comment.propTypes = {
    postData: PropTypes.object,
    onDelete: PropTypes.func
}

export default Comment
