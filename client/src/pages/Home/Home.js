import axios from 'axios';
import React from 'react'
import ChefList from '../../components/ChefList/ChefList';
import Cuisines from '../../components/Cuisines/Cuisines';
import Header from '../../components/Header/Header';
import RequestButton from '../../components/RequestButton/RequestButton';
import SearchBox from '../../components/SearchBox/SearchBox';
import './Home.scss';

class Home extends React.Component {
    state = {
        isLoading: true,
        userInfo: {}
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

    handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken')
        this.props.history.push('/login')
    }

    render() {
        const { isLoading, userInfo } = this.state
        return isLoading ? 
            <h1>Loading...</h1> 
        :
            (
                <div className="home">
                    <Header handleLogOut={this.handleLogOut} username={userInfo.username}/>
                    <Cuisines />
                    <ChefList />
                    <SearchBox />
                    <RequestButton />
                </div>
            )
    }
}

export default Home;
