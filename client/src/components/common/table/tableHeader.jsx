import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, columns }) => {
    function handleSort(item) {
        if (selectedSort.path === item && selectedSort.order === "asc") {
            onSort({ path: item, order: "desc" })
        } else {
            onSort({ path: item, order: "asc" })
        }
    }
    return (
        <thead>
            <tr className="">
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path && (
                            <i
                                className={
                                    "bi bi-caret-" +
                                    (selectedSort.order === "asc"
                                        ? "up-fill"
                                        : "down-fill")
                                }
                            ></i>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
}

export default TableHeader
