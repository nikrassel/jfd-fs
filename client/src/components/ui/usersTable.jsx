import React from "react"
import PropTypes from "prop-types"
import BookMark from "../common/bookmark"
import QualitiesList from "./qualities"
import Table, { TableBody, TableHeader } from "../common/table"
import { Link } from "react-router-dom"
import Profession from "./profession"
// файлы в реакт являются такими же объектами, поэтому их можно присваивать переменным
const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => <Link to={`${user._id}`}>{user.name}</Link>
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
        completedMeetings: {
            path: "completedMeetings",
            name: "Проведенные встречи"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    _id={user._id}
                    onToggleBookMark={onToggleBookMark}
                />
            )
        }
    }
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }}></TableHeader>
            <TableBody {...{ columns, data: users }}></TableBody>
        </Table>
        // <Table onSort = {onSort}
        // selectedSort = {selectedSort}
        // columns = {columns}
        // data = {users}>
        // </Table>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onToggleBookMark: PropTypes.func
}

export default UserTable
