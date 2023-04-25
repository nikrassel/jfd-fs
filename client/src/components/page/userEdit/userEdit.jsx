import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import PropTypes from "prop-types"
import TextField from "../../common/form/textField"
import RadioField from "../../common/form/radioField"
import SelectField from "../../common/form/selectField"
import MultiSelectField from "../../common/form/multiSelectField"
import { validator } from "../../../utils/validator"
import { useDispatch, useSelector } from "react-redux"
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities"
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions"
import { getCurrentUser, updateUser } from "../../../store/users"

function getValueFromList(val, list) {
    return list.find((elem) => { return val === elem.value })
}

const UserEdit = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser())
    // useEffect(() => {
    //     if (userId !== currentUser._id) {
    //         navigate(`/users/${currentUser._id}/edit`)
    //     }
    // }, [currentUser])
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
    const [errors, setErrors] = useState({})
    // const [data, setData] = useState({})
    const [data, setData] = useState({
        ...currentUser,
        qualities: currentUser.qualities.map((q) => (getValueFromList(q, qualitiesList)))
    })
    // useEffect(() => {
    //     setData({
    //         ...currentUser,
    //         qualities: currentUser.qualities.map((q) => (getQualById(q)))
    //     })
    // }, [currentUser])
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязателено для заполнения"
            }
        }
    }
    function handleChange({ name, value }) {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleProfChange({ name, value }) {
        console.log(value)
        const newProf = professions.find((profession) => {
            return profession._id === value
        })
        setData((prevState) => ({
            ...prevState,
            [name]: newProf._id
        }))
    }
    function handleQualChange({ name, value }) {
        const newQualities = value.map((qual) => ({
            value: qual.value,
            label: qual.label
        }))
        setData((prevState) => ({
            ...prevState,
            [name]: newQualities
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        dispatch(updateUser({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        }))
        navigate(`/users/${userId}`)
    }
    function handleBack() {
        navigate(`/users/${userId}`)
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    if (currentUser && !professionsLoading && !qualitiesLoading && data) {
        return (<div>
            <div className="d-grid gap-2 d-md-block m-2 mt-4">
                <button className="btn btn-primary" type="button" onClick={handleBack}>
                    <i className="bi bi-caret-left"></i>
                    Назад
                </button>
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя пользователя"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                error={errors.name}
                            ></TextField>
                            <TextField
                                label="Электронная почта"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                error={errors.email}
                            ></TextField>
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                label="Укажите ваш пол"
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleProfChange}
                                value={data.profession}
                            />
                            <MultiSelectField options={qualitiesList}
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                                onChange={handleQualChange}
                                name="qualities"/>
                            <button
                                disabled={!buttonActive}
                                className="btn btn-primary w-100 mx-auto">
                                Изменить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }
    return "Loading..."
}

// UserEdit.propTypes = {
//     userId: PropTypes.string.isRequired
// }
export default UserEdit
