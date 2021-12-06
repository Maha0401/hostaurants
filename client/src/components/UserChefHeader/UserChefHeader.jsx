import React from 'react'
import { NavLink } from 'react-router-dom'
import './UserchefHeader.scss'

function UserChefHeader({currentChef}) {
    return (
        <div className='navbar'>
            <NavLink className='navbar__link' activeClassName= 'navbar__active-link' to={`/viewchef/${currentChef.id}`}>About</NavLink>
            <NavLink className='navbar__link' activeClassName= 'navbar__active-link' to={`/viewchef/menu/${currentChef.id}`}>Menu</NavLink>
            <NavLink className='navbar__link' activeClassName= 'navbar__active-link' to={`/viewchef/gallery/${currentChef.id}`}>Gallery</NavLink>
        </div>
    )
}

export default UserChefHeader
