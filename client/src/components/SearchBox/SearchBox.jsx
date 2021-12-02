import React from 'react'
import './SearchBox.scss'

function SearchBox({searchHandleClick}) {
    return (
        <div className="search">
            <form onSubmit={searchHandleClick}>
                <h2 className="search__header">Search your favorite food </h2>
                <input className="search__text" type='text' placeholder="Search"></input>
            </form>
        </div>
    )
}

export default SearchBox
