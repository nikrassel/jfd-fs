import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions"

const Profession = ({ id, specialClass }) => {
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const userProf = useSelector(getProfessionById(id))
    if (!professionsLoading) {
        return <p className={specialClass}>{userProf.name}</p>
    } else return "loading ..."
}
Profession.defaultProps = {
    specialClass: ""
}
Profession.propTypes = {
    id: PropTypes.string,
    specialClass: PropTypes.string
}

export default Profession
