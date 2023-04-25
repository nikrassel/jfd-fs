import React from "react"
import PropTypes from "prop-types"

const SearchStatus = (props) => {
    function renderPhrase() {
        let personsNumber = ""
        if (props.usersNumber > 1 && props.usersNumber < 5) {
            personsNumber = "человека тусанут"
        } else {
            personsNumber = "человек тусанет"
        }
        return props.usersNumber !== 0
            ? `${props.usersNumber} ${personsNumber} с тобой сегодня`
            : `Никто с тобой не тусанет`
    }

    return (
        <h1>
            {" "}
            <span
                className={
                    "badge bg-" + (props.usersNumber > 0 ? "primary" : "danger")
                }
            >
                {renderPhrase()}
            </span>
        </h1>
    )
}

SearchStatus.propTypes = {
    usersNumber: PropTypes.number.isRequired
}

export default SearchStatus
