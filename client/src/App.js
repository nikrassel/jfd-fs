import React from "react"
import Users from "./layouts/users"
import Main from "./layouts/main"
import LogOut from "./layouts/logOut"
import NavBar from "./components/ui/navBar"
import Login from "./layouts/login"
import NotFound from "./layouts/not-found"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppLoader from "./components/ui/hoc/appLoader"
// import { useDispatch } from "react-redux"
// import { loadQualitiesList } from "./store/qualities"
// import { loadProfessionsList } from "./store/professions"
// import { loadUsersList, userBackup } from "./store/users"
// import localStorageService from "./services/localStorage.service"
// import { array } from "prop-types"

function App() {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadQualitiesList())
    //     dispatch(loadProfessionsList())
    //     dispatch(loadUsersList())
    //     if (localStorageService.getUserId()) {
    //         dispatch(userBackup())
    //     }
    // }, [])
    return (
        <>
            <AppLoader>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/users/:userId?/:edit?" Component={Users}/>
                    <Route path="/login/:type?" Component={Login} />
                    <Route path="/" Component={Main} />
                    <Route path="/logout" Component={LogOut}/>
                    <Route path="*" Component={NotFound} />
                </Routes>
            </AppLoader>
            <ToastContainer />
        </>
    )
}

export default App
