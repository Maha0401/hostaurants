import React from 'react'
import './ViewChefMenu.scss'
import axios from 'axios'
import Header from '../../components/Header/Header'
import UserChefHeader from '../../components/UserChefHeader/UserChefHeader'

class ViewChefMenu extends React.Component {
    state={
        userInfo: {},
        isLoading: true,
        currentChef: {},
        foods: []
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

        axios
            .get(`http://localhost:8080/food/chef/${this.props.match.params.chefId}`)
            .then((response) => {
            this.setState({
                foods: response.data,
            });
            })
            .then(()=>{})
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
    }

    foodClickHandle = (foodId,chefId) => {
        this.props.history.push(`/book/${foodId}/${chefId}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
          })
    }

    render() {
        return this.state.isLoading ? 
        <h1>Loading...</h1> 
        :
        (
            <div className='viewchef'>
                <Header username={this.state.userInfo.username}/>
                <UserChefHeader currentChef={this.state.currentChef}/>
                <div className='chef-foodlist'>
                {!this.state.foods[0]?<div></div>:
                    this.state.foods.map(food => {
                    return(
                        <div onClick={() => this.foodClickHandle(food.id,food.chefId)} className='chef-foodlist__food' key = {food.id}>
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
