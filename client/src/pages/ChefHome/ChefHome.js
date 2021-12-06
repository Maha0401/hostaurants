import axios from 'axios';
import React from 'react'
import Header from '../../components/Header/Header';
import ChefHeader from '../../components/ChefHeader/ChefHeader';

class ChefHome extends React.Component {
    state = {
        isLoading: true,
        chefInfo: {},
        currentChef: {}
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/chef/current', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                this.setState({
                    chefInfo: res.data,
                    isLoading: false
                })
            })
        } else {
            this.props.history.push('/login')
        }
    }

    handleLogOut = (e) => {
        e.preventDefault();

        sessionStorage.removeItem('authToken')

        this.props.history.push('/login')
    }

    render() {
        const { isLoading, chefInfo } = this.state
        return isLoading ? 
            <h1>Loading...</h1> 
        :
            (
                <div className="dashboard">
                    <Header username={chefInfo.username} />
                    <ChefHeader currentChef={chefInfo.username} />
                </div>
            )
    }
}

export default ChefHome;
