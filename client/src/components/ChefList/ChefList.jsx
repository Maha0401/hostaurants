import React from 'react'
import chef1 from '../../assets/images/1.jpg'
import chef2 from '../../assets/images/2.jpg'
import chef3 from '../../assets/images/3.jpg'
import chef4 from '../../assets/images/4.jpg'
import chef5 from '../../assets/images/5.jpg'
import chef6 from '../../assets/images/6.jpg'
import chef7 from '../../assets/images/7.jpg'
import chef8 from '../../assets/images/8.jpg'
import './ChefList.scss'

function ChefList() {
    return (
        <div className='cheflist'>
        <h2 className='cheflist__header'>Chef near you</h2>
        <div class="cheflist__list">
            <div class="cheflist__row">
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef1} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Felix</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef2} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Thessa</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef3} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Nadia</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef4} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Bob</h4>
                </div>
            </div>
            <div class="cheflist__row">
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef5} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Jay</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef6} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Ruffles</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef7} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef kamarjit</h4>
                </div>
                <div class="cheflist__chef">
                    <img className='cheflist__image' src={chef8} alt='chef_avatar'></img>
                    <h4 className='cheflist__name'>Chef Puttin</h4>
                </div>
            </div>   
        </div>
        </div>
    )
}

export default ChefList
