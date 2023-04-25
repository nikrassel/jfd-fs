import { createAction, createSlice } from "@reduxjs/toolkit"
import commentService from "../services/comment.service"
// import { nanoid } from "nanoid"

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreation: (state, action) => {
            state.entities.push(action.payload)
        },
        commentRemoving: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload)
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceved, commentsRequestFailed, commentCreation, commentRemoving } = actions
const commentCreationRequested = createAction("comments/creationRequested")
const commentCreationFailed = createAction("comments/creationFailed")
const commentRemovingRequested = createAction("comments/removingRequested")
const commentRemovingFailed = createAction("comments/removingFailed")

export const loadCommentsList = (userId) => async(dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}
export const createComment = (data) => async(dispatch) => {
    dispatch(commentCreationRequested())
    // const comment = {
    //     ...data,
    //     _id: nanoid(),
    //     created_at: Date.now()
    // }
    try {
        const { content } = await commentService.createComment(data)
        dispatch(commentCreation(content))
    } catch (error) {
        dispatch(commentCreationFailed())
    }
}
export const deleteComment = (postId) => async(dispatch) => {
    dispatch(commentRemovingRequested())
    try {
        const { content } = await commentService.removeComment(postId)
        if (!content) {
            dispatch(commentRemoving(postId))
        }
    } catch (error) {
        dispatch(commentRemovingFailed())
    }
}
export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.professions.isLoading
// export const getProfessionById = (professionId) => state => {
//     if (state.professions.entities) {
//         return state.professions.entities.find(p => p._id === professionId)
//     }
// }
export default commentsReducer
