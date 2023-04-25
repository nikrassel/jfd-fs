import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import PropTypes from "prop-types"
import TextField from "../../common/form/textField"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UserTable from "../../ui/usersTable"
import _ from "lodash"
import { useSelector } from "react-redux"
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions"
import { getCurrentUserId, getUsersList } from "../../../store/users"
// UseEffect нужен для отслеживания измений состояния компонента
// это появление, измение, удаление, пустой массив в конце нужен
// чтобы функция сработала только один раз
// деструтуризация - разделение полученные данных по одноименным переменным
// в реакт переменные, которые будут подвергатся изменениям записываеются с
// помощью useState. [имя-переменнойб метод изменения] = useState(начальное значение)
// в последствии можно вызывать useState () и передавать в скобки новое значение

const UsersList = () => {
    const pageSize = 6
    const [currentPage, setCurrentPage] = useState(1)
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    const users = useSelector(getUsersList())
    const currentUserId = useSelector(getCurrentUserId())
    const [search, setSearch] = useState("")
    // код ниже первичный вариант, получает информацию из fake api внутренних файлов проекта
    // useEffect(() => {
    //     API.users.fetchAll().then((data) => setUsers(data))
    // }, [])
    const handleDelete = (userId) => {
        // setUsers((prevState) => prevState.filter((elem) => elem._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const userIndex = users.findIndex((elem) => {
            return elem._id === id
        })
        const updatedUsers = [...users]
        if (updatedUsers[userIndex].bookmark === false) {
            updatedUsers[userIndex].bookmark = true
        } else if (updatedUsers[userIndex].bookmark === true) {
            updatedUsers[userIndex].bookmark = false
        }
        // setUsers(updatedUsers)
        console.log(updatedUsers)
    }
    function handleChange({ name, value }) {
        setSelectedProf()
        setSearch(value)
        // setSearch((prevState) => ({
        //     ...prevState,
        //     [target.name]: target.value
        // }))
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, search])
    function handlePageChange(pageIndex) {
        setCurrentPage(pageIndex)
    }
    function hanfleProfessionSelect(item) {
        setSearch("")
        setSelectedProf(item)
    }
    function handleSort(item) {
        setSortBy(item)
    }
    // Объекты являются ссылками, их нельзя сравнить по содержимому просто так,
    // это позволяет сделать метод JSON.stringify, приводя их к виду строки
    // в данном случае это используется для фильтрации пользователей по выбранной профессии
    // поскольку в объекте пользователь профессия также объект
    // альтернативный вариант сравнить отдельный элемент объектов
    if (users) {
        let filtredUsers = users.filter((u) => u._id !== currentUserId)
        filtredUsers = selectedProf
            ? filtredUsers.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf._id)
            )
            : filtredUsers
        if (search) {
            const nameRegExp = new RegExp(`(?:${search.toLowerCase()})`, "g")
            filtredUsers = filtredUsers.filter((user) =>
                nameRegExp.test(user.name.toLowerCase())
            )
        }
        // const filtredUsers = selectedProf
        //     ? users.filter((user) => user.profession._id === selectedProf._id)
        //     : users
        const count = filtredUsers.length
        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        function clearFilter() {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={hanfleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus usersNumber={count}></SearchStatus>
                    <TextField
                        label=""
                        name="search"
                        value={search}
                        placeHolder="Поиск..."
                        onChange={handleChange}
                    ></TextField>
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        ></Pagination>
                    </div>
                </div>
            </div>
        )
    }
    return "Loading..."
}
UsersList.propTypes = {
    users: PropTypes.array
}
export default UsersList

// Данный вариант фильтрации подразумевает наличие кнопки "все профессии"
// в получаемый объект с данными о профессия добавляется новый элемент
// все профессии у которого нет ид, переменная фильтрованные пользователи
// при отсутвии у элемента ид, принимает значение всего текущего листа
// useEffect(() => {
//     api.professions.fetchAll().then((data) => setProfession(
//         Object.assign(data, {
//             allProfessions: { name: "Все профессии" }
//         })
//     ))
// }, [])
// const filtredUsers = selectedProf && selectedProf._id
//         ? props.usersList.filter((user) => user.profession === selectedProf)
//         : props.usersList
