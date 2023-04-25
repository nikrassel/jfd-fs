import React from "react"
import QualitiesList from "../../ui/qualities"
import PropTypes from "prop-types"
import Profession from "../../ui/profession"
import { useSelector } from "react-redux"
import { getCurrentUserId } from "../../../store/users"

const UserCard = ({ user, toEdit }) => {
    const currentUser = useSelector(getCurrentUserId())
    return (<div className="card mb-3">
        <div className="card-body">
            {currentUser === user._id && (
                <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                    <i className="bi bi-gear" onClick={() => toEdit()}></i>
                </button>
            )}
            <div className="d-flex flex-column align-items-center text-center position-relative">
                <img src={user.image}
                    alt="avatar"
                    className="rounded-circle shadow-1-strong me-3"
                    width="150"/>
                <div className="mt-3">
                    <h4>{user.name}</h4>
                    <Profession id={user.profession} specialClass="text-secondary mb-1"/>
                    <div className="text-muted">
                        <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                        <i className="bi bi-caret-up text-secondary" role="button"></i>
                        <span className="ms-2">{user.rate}</span>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            Качества
                        </h5>
                        <h4 className="card-text">
                            <QualitiesList qualities={user.qualities} />
                        </h4>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            Completed meetings
                        </h5>
                        <h1 className="display-1">
                            {user.completedMeetings}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

UserCard.propTypes = {
    user: PropTypes.object,
    toEdit: PropTypes.func
}

export default UserCard
