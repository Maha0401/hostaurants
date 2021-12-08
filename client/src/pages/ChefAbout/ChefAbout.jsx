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
        status: '',
        editMode: false
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

    aboutEditHandle = () => {
            this.setState({
                editMode: true
            })
    }

    aboutSaveHandle = (e) => {
        e.preventDefault()
        axios
        .put(`http://localhost:8080/chef/${this.props.match.params.chefId}`, {about: e.target.about.value})
        .then((response) => {
            this.setState({
                editMode: false
            })
            })
    }
    onchangeHandle = (e) => {
        let newChef = this.state.currentChef;
        console.log(e.target.value);
        newChef.about = e.target.value;
        this.setState({
            currentChef: newChef
        })

    }


    render(){
        return this.state.isLoading || this.state.status !== 'chef'? 
        <h1>Loading...</h1> 
        :
        (
            <div className='chef'>
                <Header username={this.state.chefInfo.username}/>
                <ChefHeader currentChef={this.state.currentChef}/>
                <div className='currentchef'>
                    <div className='currentchef__img-name'>
                        <h2 className='currentchef__header'> Chef {this.state.currentChef.name} </h2>
                        <img className='currentchef__image' src={`http://localhost:8080/${this.state.currentChef.pic}`} alt={`${this.state.currentChef.name} poster`}></img>
                        <input className='currentchef__edit-button' type='button' value='Edit'></input>
                    </div>
                    <div className='currentchef__about-container'>
                        <h2 className='currentchef__about-header'>About Me</h2>
                        {this.state.editMode ?  
                            <div>
                                <form className='currentchef__edit-form' onSubmit={this.aboutSaveHandle}>
                                    <textarea onChange={this.onchangeHandle} className='currentchef__edit-about'name="about" value={this.state.currentChef.about}></textarea>
                                    <input className='currentchef__save-button' type='submit' value='Save'></input>
                                </form>
                            </div>
                            :
                            <div>
                                <h4 className='currentchef__about'>{this.state.currentChef.about}</h4>
                                <input onClick={this.aboutEditHandle} className='currentchef__edit-button' type='button' value='Edit'></input>
                            </div>
                        }
                    </div>       
                </div>
            </div>
        )
    }
}

export default ChefAbout
