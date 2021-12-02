import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import Logo from '../../assets/logo/logo.png'
import './SignUp.scss'

function SignUp(props) {
    const handleSignUp = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/users/register', {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            props.history.push('/login')
        })
    }

    const handleChefSignUp = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/chef/register', {
            name: e.target.chefName.value,
            username: e.target.chefUserName.value,
            password: e.target.chefPassword.value
        })
        .then(res => {
            props.history.push('/login')
        })
    }

    return (
        <div className="signup">
            <img className='signup__logo' src={Logo} alt='Hostaurants logo'></img>
            <div className='signup__forms'>
                <div>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <Input label="Name" name="name" type="text" />
                        <Input label="Username" name="username" type="text" />
                        <Input label="Password" name="password" type="password" />
                        <button className='signup__button' type="submit">Sign Up!</button>
                    </form>
                </div>
                <div>
                    <h1>Chef Sign Up</h1>
                    <form onSubmit={handleChefSignUp}>
                        <Input label="Name" name="chefName" type="text" />
                        <Input label="Username" name="chefUserName" type="text" />
                        <Input label="Password" name="chefPassword" type="password" />
                        <button className='signup__button' type="submit">Chef Sign Up!</button>
                    </form>
                </div>
            </div>
            <h3 className='signup__login-text'>Already have an account? Please login...</h3>
            <Link className='signup__button signup__button--login' to="/login">Log In</Link>
        </div>
    )
}

export default SignUp
