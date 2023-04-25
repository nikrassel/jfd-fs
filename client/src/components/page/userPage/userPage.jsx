import React from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import UserCard from "../../common/card/userCard"
import UserComments from "../../common/card/userComments"
import { useSelector } from "react-redux"
import { getUserById } from "../../../store/users"

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId))
    const navigate = useNavigate()
    function handleEditUser() {
        navigate(`/users/${userId}/edit`)
    }
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} toEdit={handleEditUser} />
                    </div>
                    <div className="col-md-8">
                        <UserComments/>
                    </div>
                </div>
            </div>
        )
    }
    return "Loading..."
}
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}
export default UserPage
