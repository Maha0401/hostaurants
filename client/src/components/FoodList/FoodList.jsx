import React from 'react'



function FoodList({foods}) {
    if (!foods[0]) return <div></div>
    return (
        <div>
        {foods.map(food => {
            return(
                <div key = {food.id}>
                    <p>{food.name}</p>
                    <img src={food.pic} alt={`${food.name} poster`}></img>
                </div>
                )}
        )}        
        </div>
    )
}

export default FoodList
