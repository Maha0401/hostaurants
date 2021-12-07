import React from 'react'
import axios from 'axios'
import './ChefAbout.scss'
import Header from '../../components/Header/Header'
import ChefHeader from '../../components/ChefHeader/ChefHeader'

class ChefAbout extends React.Component {
    state={
        chefInfo: {},
        isLoading: true,
        currentChef: {},
        status: ''
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
                    status: res.data.status
                })
            })
        } else {
            this.props.history.push('/login')
        }

        axios
        .get(`http://localhost:8080/chef/${this.props.match.params.chefId}`)
        .then((response) => {
            this.setState({
                currentChef: response.data[0],
                isLoading: false
            })
            
        })
    }
    render(){
        return this.state.isLoading || this.state.status !== 'chef'? 
        <h1>Loading...</h1> 
        :
        (
            <div>
                <Header username={this.state.chefInfo.username}/>
                <ChefHeader currentChef={this.state.currentChef}/>
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

export default ChefAbout
