import React, { useEffect, useState } from "react"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"
import { useNavigate } from "react-router-dom"
import { validator } from "../../utils/validator"
import { useDispatch, useSelector } from "react-redux"
import { getQualities } from "../../store/qualities"
import { getProfessions } from "../../store/professions"
import { signUp } from "../../store/users"
// import API from "../../api"
const RegisterForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const qualities = useSelector(getQualities())
    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
    const professions = useSelector(getProfessions())
    // const professionsList = professions.map((p) => ({ label: p.name, value: p._id }))
    // useEffect(() => {
    //     API.professions
    //         .fetchAll()
    //         .then((data) => setProfession(Object.assign(data)))
    //     API.qualities.fetchAll().then((data) => setQualities(data))
    // }, [])
    const validatorConfig = {
        // данный объект содержит возможные ошибки для каждого поля и сообщения которые увидит пользователь
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
            },
            min: {
                message: "Имя должно содержать минимум три символа",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен содержать минимум восемь символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Вы должны указать свою профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете пользоваться нашим сервисом без подтверждения соглашения"
            }
        }
    }
    function handleChange({ name, value }) {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`
        //     }
        // }
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        }
        console.log(newData)
        dispatch(signUp(newData))
        navigate("/")
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            ></TextField>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            ></TextField>
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            ></TextField>
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
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
            <MultiSelectField options={qualitiesList}
                label="Выберите ваши качества"
                onChange={handleChange}
                name="qualities"/>
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}>
                Подтвердить
                <a>Лицензионное соглашение</a>
            </CheckBoxField>
            <button
                disabled={!buttonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
