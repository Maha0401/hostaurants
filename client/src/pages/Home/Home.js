import axios from 'axios';
import React from 'react'
import ChefList from '../../components/ChefList/ChefList';
import Cuisines from '../../components/Cuisines/Cuisines';
import FoodList from '../../components/FoodList/FoodList';
import Header from '../../components/Header/Header';
import RequestButton from '../../components/RequestButton/RequestButton';
import SearchBox from '../../components/SearchBox/SearchBox';
import './Home.scss';

class Home extends React.Component {
    state = {
        isLoading: true,
        userInfo: {},
        query: "",
        foods: [],
        errorLoading: false,
    }

    handleQueryChange = (event) => {
        this.setState({
          query: event.target.value,
        });
    };

    handleCuisineClick = (cuisine) =>{
        axios
            .get(`http://localhost:8080/food/cuisine/${cuisine}`)
            .then((response) => {
            this.setState({
                errorLoading: false,
                foods: response.data,
            });
            window.scrollTo({
                top: 3000,
                behavior: "smooth" 
                });
            })
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
    }

    getSearchFood = (query) => {
        if(!query){
            this.setState({
                query: "",
                foods:[]
            })
            return ;
        }
        axios
            .get(`http://localhost:8080/food/search/${query}`)
            .then((response) => {
            this.setState({
                errorLoading: false,
                query: query,
                foods: response.data,
            });
            })
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
    };

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

    componentDidUpdate(prevProps, prevState) {
        const query = this.state.query;
        const prevQuery = prevState.query;
    
        // Only get new foods if the query has changed since last setState occurred!
        if (query !== prevQuery) {
          this.getSearchFood(query);
        }
      }

    requestButtonHandle = () => {
        this.props.history.push('/request')
    }

    foodClickHandle = (foodId,chefId) => {
        this.props.history.push(`/book/${foodId}/${chefId}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
          })
    }

    clickChefHandle = (id) => {
        this.props.history.push(`/viewchef/about/${id}`)
    }

    render() {
        const { isLoading, userInfo } = this.state
        return isLoading ? 
            <h1>Loading...</h1> 
        :
            (
                <div className="home">
                    <Header username={userInfo.username}/>
                    <Cuisines 
                        handleCuisineClick={this.handleCuisineClick}/>
                    <ChefList 
                        clickChefHandle={this.clickChefHandle}/>
                    <SearchBox 
                        handleQueryChange= {this.handleQueryChange}
                        query={this.state.query}/>
                    <RequestButton 
                        requestButtonHandle= {this.requestButtonHandle}/>
                    <FoodList 
                        foods={this.state.foods}
                        foodClickHandle={this.foodClickHandle}/>
                </div>
            )
    }
}

export default Home;
