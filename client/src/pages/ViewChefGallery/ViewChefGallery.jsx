import React from 'react'
import './ViewChefGallery.scss'
import axios from 'axios'
import Header from '../../components/Header/Header'
import UserChefHeader from '../../components/UserChefHeader/UserChefHeader'

class ViewChefGallery extends React.Component {
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

    render() {
        return this.state.isLoading ? 
        <h1>Loading...</h1> 
        :
        (
            <div className='viewchef'>
                <Header username={this.state.userInfo.username}/>
                <UserChefHeader currentChef={this.state.currentChef}/>
                <div className='gallery'>
                    <div className='gallery__row'>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic1}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic2}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic3}`} alt={`Gallery posts`}></img>
                    </div>
                    <div className='gallery__row'>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic4}`} alt={`Gallery posts`}></img>
                        {!this.state.foods[0]?<div></div>:
                            this.state.foods.map(food => {
                            return(
                                <div onClick={() => this.props.foodClickHandle(food.id,food.chefId)} className='chef-foodlist__food' key = {food.id}>
                                    <img className='gallery__image' src={`http://localhost:8080/${food.pic}`} alt={`${food.name} poster`}></img>
                                </div>
                                )}
                        )}
                    </div>        
                </div>
            </div>
        )
    }
}

export default ViewChefGallery
