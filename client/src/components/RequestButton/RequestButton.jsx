import React from 'react'
import './RequestButton.scss'

function RequestButton({requestButtonHandle}) {
    return (
        <div className="request">
            <h2 className="request__header">Cant find what you are looking for?</h2>
            <h2 className="request__header">You can now customize your food</h2>
            <input className="request__button" type='button' onClick={requestButtonHandle} value="Request"></input>
        </div>
    )
}

export default RequestButton
