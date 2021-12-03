import React from 'react'
import Logo from '../../assets/logo/logo.png'
import './Header.scss'

class Header extends React.Component {

    render(){
        return (
            <div className='header'>
                <h1 className='header__greeting'>Welcome! {this.props.username}</h1>
                <img className='header__logo' src={Logo} alt='Hostaurants logo'></img>
                    {<button className='header__logout' onClick={this.props.handleLogOut}>Log Out</button>}
            </div>
        )
    }
}

export default Header
