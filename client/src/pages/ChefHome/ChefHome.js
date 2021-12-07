import axios from 'axios';
import React from 'react'
import Header from '../../components/Header/Header';
import ChefHeader from '../../components/ChefHeader/ChefHeader';
import './ChefHome.scss'

class ChefHome extends React.Component {
    state = {
        isLoading: true,
        chefInfo: {},
        currentChef: {},
        requests: [],
        foods: [],
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
                    chefInfo: res.data.username,
                    status: res.data.status
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

        axios.get('http://localhost:8080/chef/requests')
        .then (res=>{
            this.setState({
                requests: res.data,
            })
        })
        
        axios.get(`http://localhost:8080/chef/foods/${this.props.match.params.chefId}`)
        .then (res=>{
            this.setState({
                foods: res.data,
                isLoading: false
            })
        })

    }

    handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken')
        this.props.history.push('/login')
    }

    render() {
        const { isLoading, chefInfo } = this.state
        return isLoading || this.state.status !== 'chef'? 
            <h1>Loading...</h1> 
        :
            (
                <div className="dashboard">
                    <Header username={chefInfo} />
                    <ChefHeader currentChef={this.state.currentChef} />
                    <div className = 'chef-home'>

                        <div className='chef-home__book'>
                        <h2 className='chef-home__header'>Food Orders</h2>
                        {this.state.foods.map(food=>{
                            return (
                                <div>
                                        <h3>{food.foodName}</h3>
                                        <p>Message: {food.message}</p>
                                        <p>Date: {food.date}</p>
                                        <p>Name: {food.clientName}</p>
                                        <div className='chef-home__buttons'>
                                            <input className='chef-home__request-button' type='button' value='Accept'></input>
                                            <input className='chef-home__request-button chef-home__request-button--reject' type='button' value='Reject    '></input>
                                        </div>
                                    </div>  
                            )
                        })}
                        </div>                       

                        <div className='chef-home__request'>  
                        <h2 className='chef-home__header'>Food Requests</h2>
                          {this.state.requests.map(request=>{
                              return (
                              <div>
                                  <h3 className='chef-home__request-header'>{request.name}</h3>
                                  <p className='chef-home__request-desc'>{request.description}</p>
                                  <input className='chef-home__request-button' type='button' value='respond'></input>
                              </div>
                              )
                          })}  
                        </div>
                    </div>
                </div>
            )
    }
}

export default ChefHome;
