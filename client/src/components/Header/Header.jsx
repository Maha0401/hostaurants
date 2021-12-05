import React from 'react'
import Logo from '../../assets/logo/logo.png'
import './Header.scss'
import { withRouter } from 'react-router-dom';


class Header extends React.Component {
    
    handleLogoClick =()=>{
        this.props.history.push('/')
    }

    handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken')
        this.props.history.push('/login')
    };

    render(){
        return (
            <div className='header'>
                <h1 className='header__greeting'>Welcome! {this.props.username}</h1>
                <img onClick={this.handleLogoClick} className='header__logo' src={Logo} alt='Hostaurants logo'></img>
                    {<button className='header__logout' onClick={this.handleLogOut}>Log Out</button>}
            </div>
        )
    }
}

export default withRouter (Header);
