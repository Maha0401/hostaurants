import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './UserchefHeader.scss'

function UserChefHeader({currentChef}) {
    return (
        <div className='navbar'>
            <NavLink className='navbar__link' to={`/viewchef/${currentChef.id}`}>About</NavLink>
            <NavLink className='navbar__link' to={`/viewchef/menu/${currentChef.id}`}>Menu</NavLink>
            <NavLink className='navbar__link' to={`/viewchef/gallery/${currentChef.id}`}>Gallery</NavLink>
        </div>
    )
}

export default UserChefHeader
