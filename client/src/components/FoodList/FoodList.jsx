import React from 'react'
import './FoodList.scss'

function FoodList({foods}) {
    if (!foods[0]) return <div></div>
    return (
        <div className='foodlist'>
        {foods.map(food => {
            return(
                <div className='foodlist__food' key = {food.id}>
                    <h2 className='foodlist__header'>{food.name}</h2>
                    <img className='foodlist__image' src={`http://localhost:8080/${food.pic}`} alt={`${food.name} poster`}></img>
                </div>
                )}
        )}        
        </div>
    )
}

export default FoodList
