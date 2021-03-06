import React from 'react';
import logo from '../components/logo.svg';


const Footer = () => {
    return (
        <div className = "footer">
            <p>made by
            <a
                className="App-link"
                href="https://developers.google.com/maps/documentation/javascript/tutorial"
                target="_blank"
                rel="noopener noreferrer"
            > Google Maps Api, </a>
            <a
                className="App-link"
                href="https://developer.foursquare.com/"
                target="_blank"
                rel="noopener noreferrer"
            > Foursquare Api</a>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            > and <img src={logo} className = "App-logo"alt="React logo" />React</a>
            </p>
            
        </div>
    )
}

export default Footer