import React from 'react'
import './ViewChefGallery.scss'
import axios from 'axios'
import Header from '../../components/Header/Header'
import UserChefHeader from '../../components/UserChefHeader/UserChefHeader'

class ViewChefGallery extends React.Component {
    state={
        userInfo: {},
        isLoading: true,
        currentChef: {}
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

        axios
        .get(`http://localhost:8080/chef/${this.props.match.params.chefId}`)
        .then((response) => {
            this.setState({currentChef: response.data[0]})
        })
    }

    render() {
        return this.state.isLoading ? 
        <h1>Loading...</h1> 
        :
        (
            <div>
                <Header username={this.state.userInfo.username}/>
                <UserChefHeader currentChef={this.state.currentChef}/>
            </div>
        )
    }
}

export default ViewChefGallery
