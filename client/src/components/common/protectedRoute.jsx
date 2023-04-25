import React from "react"
import PropTypes from "prop-types"
import { useAuth } from "../../hooks/useAuth"
import { Route, useNavigate } from "react-router-dom"
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    return (
        <Route
            { ...rest }
            render={(props) => {
                if (!currentUser) {
                    return navigate("/login")
                }
                return Component
                    ? <Component { ...props } />
                    : children
            }}
        />
    )
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProtectedRoute
