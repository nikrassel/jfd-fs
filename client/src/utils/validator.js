// метод валидации введенных данных, получает со страницы с полями данные полей (data)
// и параметры по которым будет проводится валидация (config)
// в случае isEmail использовано регулярное выражение - шаблон для текста
// сайт regex101 содержат инструментарий для составления таких шаблонов
export function validator(data, config) {
    const errors = {}
    function validate(validateMethod, data, config) {
        let statusValidate
        switch (validateMethod) {
        case "isRequired": {
            if (typeof data === "boolean") {
                statusValidate = !data
            } else {
                statusValidate = data.trim() === ""
            }
            break
        }
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g
            statusValidate = !emailRegExp.test(data)
            break
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g
            statusValidate = !capitalRegExp.test(data)
            break
        }
        case "isContainDigit": {
            const containDigitRegExp = /\d+/g
            statusValidate = !containDigitRegExp.test(data)
            break
        }
        case "min": {
            statusValidate = data.length < config.value
            break
        }
        default:
            break
        }
        if (statusValidate) return config.message
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}
