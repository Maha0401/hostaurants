import React from 'react'
import { NavLink } from 'react-router-dom'
import './ChefHeader.scss'

function UserChefHeader({currentChef}) {
    return (
        <div className='chef-navbar'>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/${currentChef.id}`}>Home</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/about/${currentChef.id}`}>About</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/menu/${currentChef.id}`}>Menu</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/gallery/${currentChef.id}`}>Gallery</NavLink>
        </div>
    )
}

export default UserChefHeader