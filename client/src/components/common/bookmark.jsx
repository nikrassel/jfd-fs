import React from "react"
import PropTypes from "prop-types"

const BookMark = (props) => {
    const { status, _id, onToggleBookMark } = props
    if (status === undefined) {
        return (
            <i
                className="bi bi-bookmark"
            ></i>
        )
    }
    return (
        <>
            <button>
                {status === false ? (
                    <i
                        className="bi bi-bookmark"
                        onClick={() => onToggleBookMark(_id)}
                    ></i>
                ) : (
                    <i
                        className="bi bi-bookmark-fill"
                        onClick={() => onToggleBookMark(_id)}
                    ></i>
                )}
            </button>
        </>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool,
    _id: PropTypes.string,
    onToggleBookMark: PropTypes.func
}

export default BookMark
