import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Qualitie from "./qualitie"
import { useDispatch, useSelector } from "react-redux"
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities"

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesByIds(qualities))
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])
    if (isLoading) return "Loading ..."
    return (
        <>
            {qualitiesList.map((item) => (
                <Qualitie id={item._id} key={item._id} {...item}></Qualitie>
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
