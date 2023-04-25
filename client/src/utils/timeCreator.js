export function timeCreator(time) {
    const months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const corTime = new Date(time)
    const timeDifference = Date.now() - corTime
    let passTime
    if (timeDifference < 5 * 60 * 1000) {
        passTime = "1 минуту назад"
    } else if (timeDifference < 10 * 60 * 1000) {
        passTime = "5 минут назад"
    } else if (timeDifference < 30 * 60 * 1000) {
        passTime = "10 минут назад"
    } else if (timeDifference < 60 * 60 * 1000) {
        passTime = "30 минут назад"
    } else if (timeDifference < 1140 * 60 * 1000) {
        passTime = `${corTime.getHours()}:${corTime.getMinutes()}`
    } else if (timeDifference <= 365 * 1140 * 60 * 1000) {
        passTime = `${corTime.getDate()} ${months[corTime.getMonth()]}`
    } else if (timeDifference > 365 * 1140 * 60 * 1000) {
        passTime = `${corTime.getDate()} ${months[corTime.getMonth()]} ${corTime.getFullYear()}`
    }
    return passTime
}
