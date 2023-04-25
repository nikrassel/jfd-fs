import React, { useEffect, useState } from "react"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { getAuthErrors, login } from "../../store/users"
// import { validator } from "../../utils/validator"
// То, что пользовател вводит в поле email передается в переменную в email через сочетание
// value и обработчика событий. Если полей несколько можно создать отдельную переменную и обработчик для нее
// или можно создать объект содержащий имена всех полей, которые переданы им в поле name
// функция захвата измений поля получает событие (event) и сразу деструктуризирует его цель (target)
// метод setData использует предыдущее состояние объекта заменяет значение своего элемента по имени инпута
// тем самым сохраняя значения всех остальных полей. Таким образом можно управлять любым количеством вводов
// с помощью всего одного объекта и одного обработчика событий. Также с помощью name можно реализовать
// выбор одного варианта, когда type инпута radio (флажок)
// метод validate необходим для обработки ошибок он проходит по элементам data проверяя наличие в них значений
// если значение отсутствует вносит в переменную error сообщение об этом. Метод дополнительно вызываается
//  в процессе обработки нажатия на кнопку submit, если будут выявлены ошибки, отправки данных не произойдет
// yup - специальная библиотека с инструментами для валидации, приведен пример в виде validateScheme
// также в файле закомментирован вариант валидации без него
const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginError = useSelector(getAuthErrors())
    const validateScheme = yup.object().shape({
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Электронная почта введена не корректно"),
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
            .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
            // .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать хотя бы один специальный символ")
            .matches(/(?=.{8,})/, "Пароль должен содержать минимум восемь символов")
    })
    // const validatorConfig = {
    //     // данный объект содержит возможные ошибки для каждого поля и сообщения которые увидит пользователь
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Электронная почта введена не корректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязателен для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен содержать минимум восемь символов",
    //             value: 8
    //         }
    //     }
    // }
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
        // const errors = validator(data, validatorConfig)
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`
        //     }
        // }
        // setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        dispatch(login(data))
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
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            ></TextField>
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="stayOn">
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                disabled={!buttonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
