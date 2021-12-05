import React from 'react'
import './Request.scss'
import axios from 'axios';
import Header from '../../components/Header/Header'
import './Request.scss'

class Request extends React.Component {
    state={
        userInfo: {},
        isLoading: true,
    }

    handleRequestSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:8080/food/request`
            , {
            "name": e.target.name.value,
            "description": e.target.description.value,
            "username": this.state.userInfo.username
            }
        )
        .then((res) => {
            alert('Request Successful you will be notified if any chef is taking up this request');
        })
        .then(()=>{
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleCancel = () =>{
        this.props.history.push('/')
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/users/current', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                this.setState({
                    userInfo: res.data,
                    isLoading: false
                })
            })
        } else {
            this.props.history.push('/login')
        }
    }

    render(){
        return this.state.isLoading ? 
            <h1>Loading...</h1> 
        :
        (
            <div>
                <Header username={this.state.userInfo.username}/>
                <form className="requestform" onSubmit={this.handleRequestSubmit}>
                    <div className="requestform__input">
                        <label className="requestform__label" htmlFor='name'>Food Name</label>
                        <input className="requestform__name-txtbox" type='text' placeholder='Food Name' name='name'></input>
                    </div>
                    <div className="requestform__input">
                        <label className="requestform__label" htmlFor='description'>Description</label>
                        <textarea className="requestform__desc-txtbox" placeholder='Description' name='description'></textarea>
                    </div>
                    <div className="requestform__buttons">
                        <input className="requestform__cancelbtn" type='button' onClick={this.handleCancel} value='Cancel'></input>
                        <input className="requestform__requestbtn" type='submit' value='Request'></input>
                    </div>
                </form>
            </div>
        )
    }
    
}

export default Request
