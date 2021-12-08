import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input';
import Logo from '../../assets/logo/logo.png'
import './LogIn.scss'

function LogIn(props) {

    const handleLogIn = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/users/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            props.history.push(`/`)
        })
    }

    const handleChefLogIn = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/chef/login', {
            username: e.target.chefUsername.value,
            password: e.target.chefPassword.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            props.history.push(`/chef/${res.data.id}`)
        })
    }

    return (
        <div className="login">
            <img className='login__logo' src={Logo} alt='Hostaurants logo'></img>
            <div className="login__forms">
                <div className="login__user">
                    <h1>Log In</h1>
                    <form onSubmit={handleLogIn}>
                        <Input label="Username" name="username" type="text"/>
                        <Input label="Password" name="password" type="password" />
                        <button className='login__button' type="submit">Log In</button>
                    </form>
                </div>
                <div className="login__chef">
                    <h1>Chef Log In</h1>
                    <form onSubmit={handleChefLogIn}>
                        <Input label="Username" name="chefUsername" type="text" />
                        <Input label="Password" name="chefPassword" type="password" />
                        <button className='login__button' type="submit">Log In</button>
                    </form>
                </div>
            </div>
            <h2 className='login__signup-text'>Dont have an account yet? Please signup...</h2>
            <Link className='login__button login__button--signup' to="/signup">Sign Up</Link>
        </div>
    )
}

export default LogIn;