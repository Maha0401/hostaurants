import React from 'react'
import indian from '../../assets/images/indian.jpg'
import thai from '../../assets/images/thai.jpg'
import mexican from '../../assets/images/mexican.jpg'
import french from '../../assets/images/french.jpg'
import chinese from '../../assets/images/chinese.jpg'
import italian from '../../assets/images/italian.jpg'
import mediterranean from '../../assets/images/mediterranean.jpg'
import greek from '../../assets/images/greek.jpg'

import './Cuisine.scss'


function Cuisines() {
    return (
        <div className='cuisines'>
            <h2 className='cuisines__header'>Cuisines</h2>
            <div className="cuisines__row">
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={indian} alt='Indian Food'></img>
                    <h4 className='cuisines__name'>Indian</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={thai} alt='Thai Food'></img>
                    <h4 className='cuisines__name'>Thai</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={mexican} alt='Mexican Food'></img>
                    <h4 className='cuisines__name'>Mexican</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={greek} alt='Greek Food'></img>
                    <h4 className='cuisines__name'>Greek</h4>
                </div>
            </div>
            <div className="cuisines__row">
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={french} alt='French Food'></img>
                    <h4 className='cuisines__name'>French</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={chinese} alt='Chinese Food'></img>
                    <h4 className='cuisines__name'>Chinese</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={italian} alt='Italian Food'></img>
                    <h4 className='cuisines__name'>Italian</h4>
                </div>
                <div className="cuisines__cuisine">
                    <img className='cuisines__image' src={mediterranean} alt='Mediterranean Food'></img>
                    <h4 className='cuisines__name--mediterranean'>Mediterranean</h4>
                </div>   
            </div>
        </div>
    )
}

export default Cuisines
