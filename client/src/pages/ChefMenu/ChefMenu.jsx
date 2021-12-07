import React from 'react'
import './ChefMenu.scss'
import axios from 'axios'
import Header from '../../components/Header/Header'
import ChefHeader from '../../components/ChefHeader/ChefHeader'

class ViewChefMenu extends React.Component {
    state={
        chefInfo: {},
        isLoading: true,
        currentChef: {},
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
            this.setState({currentChef: response.data[0]})
        })

        axios
            .get(`http://localhost:8080/food/chef/${this.props.match.params.chefId}`)
            .then((response) => {
            this.setState({
                foods: response.data,
                isLoading: false
            });
            })
            .then(()=>{})
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
    }

    render() {
        return this.state.isLoading || this.state.status !== 'chef'? 
        <h1>Loading...</h1> 
        :
        (
            <div>
                <Header username={this.state.chefInfo.username}/>
                <ChefHeader currentChef={this.state.currentChef}/>
                <div className='chef-foodlist'>
                {!this.state.foods[0]?<div></div>:
                    this.state.foods.map(food => {
                    return(
                        <div className='chef-foodlist__food' key = {food.id}>
                            <h2 className='chef-foodlist__header'>{food.name}</h2>
                            <img className='chef-foodlist__image' src={`http://localhost:8080/${food.pic}`} alt={`${food.name} poster`}></img>
                        </div>
                        )}
                )}        
                </div>
            </div>
        )
    }
}

export default ViewChefMenu
