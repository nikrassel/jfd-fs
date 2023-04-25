import React, { useEffect } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import UserPage from "../components/page/userPage/userPage"
import UsersList from "../components/page/userList/usersList"
import UserEdit from "../components/page/userEdit/userEdit"
import { useSelector } from "react-redux"
import { getIsLoggedIn, getCurrentUserId } from "../store/users"
import UsersLoader from "../components/ui/hoc/usersLoader"

const Users = () => {
    const currentUserId = useSelector(getCurrentUserId())
    const isLoggedIn = useSelector(getIsLoggedIn())
    const navigate = useNavigate()
    const { userId } = useParams()
    const { edit } = useParams()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <UsersLoader>
                {userId
                    ? (edit
                        ? userId === currentUserId
                            ? (<UserEdit />)
                            : (<Navigate to={`/users`} replace={true}/>)
                        : (<UserPage userId={userId}></UserPage>))
                    : (<UsersList></UsersList>)
                }
            </UsersLoader>
        </>
    )
    // if (edit) {
    //     return <UserEdit userId={userId} />
    // } else if (userId) {
    //     return <UserPage userId={userId}></UserPage>
    // } else {
    //     return <UsersList></UsersList>
    // }
}

export default Users
