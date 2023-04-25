import { createAction, createSlice } from "@reduxjs/toolkit"
import userService from "../services/user.service"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"
import { generateAuthError } from "../utils/generateAuthError"

const initialState = localStorageService.getAccesToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: localStorageService.getUserId(),
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        usersReceved: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        usersUpdate: (state, action) => {
            const userIndex = state.entities.findIndex(u => u._id === action.payload._id)
            state.entities[userIndex] = action.payload
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const { reducer: usersReducer, actions } = usersSlice
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    usersUpdate,
    userLoggedOut
} = actions
const authRequested = createAction("users/authRequested")
const usersUpdateRequested = createAction("users/updateRequested")
const usersUpdateFailed = createAction("users/updateFailed")
export const login = (payload) => async(dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({ email, password })
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess(data.userId))
    } catch (error) {
        console.log(error)
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}

export const signUp = (payload) => async(dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess(data.userId))
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}
export const updateUser = (data) => async(dispatch) => {
    dispatch(usersUpdateRequested())
    try {
        const { content } = await userService.updateUser(data)
        dispatch(usersUpdate(content))
    } catch (error) {
        dispatch(usersUpdateFailed())
    }
}
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
}
export const loadUsersList = () => async(dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersReceved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}
export const getUsersList = () => (state) => state.users.entities
export const getUserById = (userId) => state => {
    if (state.users.entities) {
        return state.users.entities.find(u => u._id === userId)
    }
}
export const getCurrentUser = () => state => {
    if (state.users.entities) return state.users.entities.find(u => u._id === state.users.auth)
    return null
}
export const getError = () => state => {
    if (state.users.error) return state.users.error
    return null
}
export const userBackup = () => (dispatch) => {
    const userId = localStorageService.getUserId()
    dispatch(authRequestSuccess(userId))
}
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getFullState = () => (state) => state.users
export const getCurrentUserId = () => (state) => state.users.auth
export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
