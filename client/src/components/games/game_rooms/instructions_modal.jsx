import React from 'react';
import "./instructions_modal.css";

class Instructions extends React.Component {
    constructor(props) {
        super(props)
    }

    closeModal() {

    }

    render() {
        return(
            <div className="instructions-modal">
                <div className="instructions-X" onClick={this.props.hideInstructions}>
                    &#x000D7;
                </div>
                <div className="instruction-header">
                    <h1>Instructions: </h1>
                </div>
                <div className="instructions-text">
                    <h2>If you are the drawer:</h2>
                    <br/>   
                    <h3>You have 60 seconds to draw the word above. Please do not write any words.</h3>
                    <br/>
                    <h2>If you are guessing:</h2>
                    <br/>
                    <h3>Type all messages and guesses inside the chat. Correct guesses will be censored. Guesses have to exactly match the target word</h3>
                </div>
            </div>
        )
    }
}

export default Instructions;