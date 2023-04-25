import React from "react"
import PropTypes from "prop-types"
import TableBody from "./tablebody"
import TableHeader from "./tableHeader"

// children это все элементы переданные сюда из userTable, таблица устроена таким образом
// что будет работать и без них самостоятельно обращаясь к TableHead и TableBody
// это позволяет использовать таблицу в любом проекте
const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <>
            <table className="table">
                {children || (
                    <>
                        <TableHeader {...{ onSort, selectedSort, columns }} />
                        <TableBody {...{ columns, data }} />
                    </>
                )}
            </table>
        </>
    )
}
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
}

export default Table
