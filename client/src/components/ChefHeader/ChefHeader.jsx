import React from 'react'
import { NavLink } from 'react-router-dom'
import './ChefHeader.scss'

function UserChefHeader() {
    return (
        <div className='chef-navbar'>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef`}>Home</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/about`}>About</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/menu`}>Menu</NavLink>
            <NavLink className='chef-navbar__link' activeClassName= 'navbar__active-link' to={`/chef/gallery`}>Gallery</NavLink>
        </div>
    )
}

export default UserChefHeader