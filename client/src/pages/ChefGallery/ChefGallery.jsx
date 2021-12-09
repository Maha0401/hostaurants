import React from 'react'
import './ChefGallery.scss'
import axios from 'axios'
import Header from '../../components/Header/Header'
import ChefHeader from '../../components/ChefHeader/ChefHeader'

class ViewChefGallery extends React.Component {
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
                    isLoading: false,
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
            <div className='chef'>
                <Header username={this.state.chefInfo.username}/>
                <ChefHeader currentChef={this.state.currentChef}/>
                <div className='gallery'>
                    <div className='gallery__row'>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic1}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic2}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic3}`} alt={`Gallery posts`}></img>
                        <img className='gallery__image' src={`http://localhost:8080/${this.state.currentChef.pic4}`} alt={`Gallery posts`}></img>
                    </div>
                    <input className='gallery__edit-button' type='button' value='Edit Gallery Images'></input>       
                </div>
            </div>
        )
    }
}

export default ViewChefGallery
