import React from 'react'
import Logo from '../../assets/logo/logo.png'
import './Header.scss'

function Header({handleLogOut, username}) {
    return (
        <div className='header'>
            <h1 className='header__greeting'>Welcome! {username}</h1>
            <img className='header__logo' src={Logo} alt='Hostaurants logo'></img>
            <button className='header__logout' onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Header
