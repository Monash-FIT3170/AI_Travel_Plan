import "../style.css"
import ChatMain from "./ChatMain";
import React from 'react';
import ItineraryMain from "./ItineraryMain";
import MoreInfoMain from "./MoreInfoMain";

class MainNavButtons extends React.Component{
    constructor() {
        super();
        this.state = {showDiv: null}
    }
    render() {
        return (
            <div>
                <ul>
                    <button onClick={() => {this.setState({showDiv: 'first'})}}>ChatButton</button>
                    <button onClick={() => {this.setState({showDiv: 'second'})}}>ItineraryButton</button>
                    <button onClick={() => {this.setState({showDiv: 'third'})}}>MoreInfoButton</button>
                    {this.state.showDiv === 'first' ?
                        <div id="chatMain"><ChatMain></ChatMain></div> : null}
                    {this.state.showDiv === 'second' ?
                        <div id="chatMain"><ItineraryMain></ItineraryMain></div> : null}
                    {this.state.showDiv === 'third' ?
                        <div id="chatMain"><MoreInfoMain></MoreInfoMain></div> : null}
                </ul>
            </div>
        )
    }
}

export default MainNavButtons;