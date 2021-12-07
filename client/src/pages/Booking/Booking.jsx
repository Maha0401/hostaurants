import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'reactjs-popup/dist/index.css';
import Header from '../../components/Header/Header';
import './Booking.scss'
import axios from 'axios'

class Booking extends React.Component {

    state = {
        inputValue: '',
        display: '',
        userInfo: {},
        currentFood: {},
        currentChef: {}
    }

    componentDidMount(){
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/users/current', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                this.setState({userInfo:res.data})
            })
        } else {
            this.props.history.push('/login')
        }

        axios
        .get(`http://localhost:8080/food/${this.props.match.params.foodId}`)
        .then((response) => {
            this.setState({currentFood: response.data[0]})
        })

        axios
        .get(`http://localhost:8080/chef/${this.props.match.params.chefId}`)
        .then((response) => {
            this.setState({currentChef: response.data[0]})
        })
    }



    onCancelHandle = () => {
        this.props.history.push('/')
    }

    okayModalHandler = () => {
        this.setState({display:''})
    }

    handleInput = value => {
        console.log(value.toString().slice(0,15))
        this.setState({InputValue: value.toString().slice(0,15)})}

    OnBookHandle = (e) => {
        e.preventDefault();

        //axios.get(`http://localhost:8080/food/${food.foodId}`).then((res)=>{}

        axios
        .post(`http://localhost:8080/food/book`
            , {
                "foodId": this.props.match.params.foodId,
                "foodName": this.state.currentFood.name,
                "chefId": this.props.match.params.chefId,
                "date": this.state.InputValue,
                "message": e.target.message.value,
                "clientName": this.state.userInfo.username
            }
        )
        .then((res) => {
            console.log(this.state.inputValue)
            this.setState({display:'booking__popup--show'})
        })    
    }

    render() {
        return (
            <div className='booking'>
            <Header username={this.state.userInfo.username}/>
            <div className='bookcurrentchef'>
                <img className='bookcurrentchef__image' src={`http://localhost:8080/${this.state.currentChef.pic}`} alt={`${this.state.currentChef.name} poster`}></img>
                <h2 className='bookcurrentchef__header'>Presented by Chef {this.state.currentChef.name} <a className='bookcurrentchef__link' href = {`/viewchef/about/${this.state.currentChef.id}`}>[Check Out my page here]</a></h2>        
            </div>
                <form onSubmit={this.OnBookHandle} className='booking__form'> 
                <div className='currentfood'>
                    <h2 className='currentfood__header'>{this.state.currentFood.name}</h2>
                    <img className='currentfood__image' src={`http://localhost:8080/${this.state.currentFood.pic}`} alt={`${this.state.currentFood.name} poster`}></img>
                    <h3 className='currentfood__description'>{this.state.currentFood.description}</h3>
                </div> 
                    <Calendar className='booking__calender' name='calender' 
                        onChange={this.handleInput}/>
                    <div className='booking__time-message-buttons'>
                        <select className = 'booking__time' name='time'>
                            <option value="" default>Please select time</option>
                            <option value="5:00pm">5:00 pm</option>
                            <option value="6:00pm">6:00 pm</option>
                            <option value="7:00pm">7:00 pm</option>
                            <option value="8:00pm">8:00 pm</option>
                        </select>
                        <label className='booking__message-label' htmlFor='message'> Message  to  Chef</label>
                        <textarea className='booking__message-txtbox' name='message' placeholder='Message to Chef'></textarea>
                        <div>
                            <input className='booking__button' type='button' onClick={this.onCancelHandle} value ="Cancel" ></input>
                            <input className='booking__button booking__button--book' type='submit' value = "Book" ></input>
                        </div>
                    </div>
                </form>
                <div className={'booking__popup '+this.state.display}>
                    <div className='booking__popup-content'>
                        <p className='booking__successful'>Booking Successful</p>
                        <input className='booking__okay-button' onClick={this.okayModalHandler} type='button' value='ok'></input>
                    </div>
                </div>
            </div>
        )
    }
}

export default Booking
