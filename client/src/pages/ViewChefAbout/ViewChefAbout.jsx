import React from 'react'
import axios from 'axios'
import './ViewChefAbout.scss'
import Header from '../../components/Header/Header'
import UserChefHeader from '../../components/UserChefHeader/UserChefHeader'

class ViewChefAbout extends React.Component {
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
    render(){
        return this.state.isLoading ? 
        <h1>Loading...</h1> 
        :
        (
            <div>
                <Header username={this.state.userInfo.username}/>
                <UserChefHeader currentChef={this.state.currentChef}/>
                <div className='currentchef'>
                    <div className='currentchef__img-name'>
                        <h2 className='currentchef__header'> Chef {this.state.currentChef.name} </h2>
                        <img className='currentchef__image' src={`http://localhost:8080/${this.state.currentChef.pic}`} alt={`${this.state.currentChef.name} poster`}></img>
                    </div>
                    <div className='currentchef__about-container'>
                        <h2 className='currentchef__about-header'>About Me</h2>
                        <h4 className='currentchef__about'>{this.state.currentChef.about}</h4>
                    </div>       
                </div>
            </div>
        )
    }
}

export default ViewChefAbout
