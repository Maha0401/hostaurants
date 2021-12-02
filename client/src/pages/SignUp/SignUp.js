import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'

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
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <Input label="Name" name="name" type="text" />
                <Input label="Username" name="username" type="text" />
                <Input label="Password" name="password" type="password" />

                <button type="submit">Sign Up!</button>
            </form>
            <h1>Chef Sign Up</h1>
            <form onSubmit={handleChefSignUp}>
                <Input label="Name" name="chefName" type="text" />
                <Input label="Username" name="chefUserName" type="text" />
                <Input label="Password" name="chefPassword" type="password" />
                <button type="submit">Chef Sign Up!</button>
            </form>
            <Link to="/login">Log In</Link>
        </div>
    )
}

export default SignUp
