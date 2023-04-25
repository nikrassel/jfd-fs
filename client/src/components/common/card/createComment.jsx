import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { validator } from "../../../utils/validator"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserId } from "../../../store/users"
import { createComment } from "../../../store/comments"

const CreateComment = ({ pageId }) => {
    const comId = pageId
    const dispatch = useDispatch()
    const currentUserId = useSelector(getCurrentUserId())
    const [newComment, setComment] = useState({
        pageId: comId,
        content: "",
        userId: currentUserId
    })
    const [errors, setErrors] = useState({})
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не должно быть пустым"
            }
        }
    }
    function handleTextChange(target) {
        setComment((prevState) => ({
            ...prevState,
            content: target.target.value
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        dispatch(createComment({ ...newComment }))
        setComment((prevState) => ({
            ...prevState,
            content: ""
        }))
    }
    useEffect(() => {
        validate()
    }, [newComment])
    const validate = () => {
        const errors = validator(newComment, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <textarea
                    className="form-control"
                    label="Сообщение"
                    name="text"
                    rows='3'
                    value= {newComment.content}
                    onChange= {handleTextChange}>
                </textarea>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <button
                    className="btn btn-primary me-md-2"
                    disabled={!buttonActive}>
                Опубликовать
                </button>
            </div>
        </form>
    )
}

CreateComment.propTypes = {
    pageId: PropTypes.string.isRequired
}

export default CreateComment
