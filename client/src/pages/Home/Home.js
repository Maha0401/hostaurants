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
        // const query = this.state.query;

        // if (query) {
        //   this.getSearchFood(query);
        // }

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
                    <SearchBox 
                        handleQueryChange= {this.handleQueryChange}
                        query={this.state.query}/>
                    <RequestButton />
                    <FoodList 
                        foods={this.state.foods}/>
                </div>
            )
    }
}

export default Home;
