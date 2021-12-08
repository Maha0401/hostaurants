import React from 'react'
import './SearchBox.scss'

function SearchBox({handleQueryChange, query, scrollToSearch}) {
    return (
        <div className="search">
                <h2 className="search__header">Search your favorite food </h2>
                <input 
                    onChange={handleQueryChange} 
                    className="search__text" 
                    type='text' 
                    placeholder="Search"
                    value={query}>
                </input>
                <input className="search__button" onClick={scrollToSearch} type='submit' value='Search'></input>
        </div>
    )
}

export default SearchBox
