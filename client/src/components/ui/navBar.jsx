import React from "react"
import { Link } from "react-router-dom"
import NavProfile from "./navProfile"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from "../../store/users"

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul type="none" className="nav nav-pills nav-fill">
                    <h3>
                        <li className="m-4">
                            <Link to="/">Main</Link>
                        </li>
                    </h3>
                    {isLoggedIn && (
                        <h3>
                            <li className="m-4">
                                <Link to="/Users">Users</Link>
                            </li>
                        </h3>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn
                        ? <NavProfile />
                        : (
                            <h3>
                                <Link to="/login">Login</Link>
                            </h3>
                        )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
