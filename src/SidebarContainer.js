import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';

class SidebarContainer extends Component {
    constructor(props) {
    super(props);
        this.state = {
        query:'',
        listDataHolder: []
        };
    }
    

    udpateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    if (query) {
        let showingListOfLocals;
        const match = new RegExp((query), 'i');

        showingListOfLocals = this.props.locals.filter(local => 
            match.test(local.name));
        this.setState({listDataHolder : showingListOfLocals});

        console.log("listDataHolder : showingListOfLocals");
        } 
        /*else {
            this.setState({listDataHolder : this.props.locals});
            
            console.log("listDataHolder updated with this.props.locals");
        } 
        */

    render() {
        return (
            <aside className ="sidebarContainer" >
                <form className="form">
                    <input 
                        className="input-field" 
                        type="text" 
                        value={this.state.query} 
                        onChange={event => this.udpateQuery(event.target.value)}  
                        placeholder="Search for café..." 
                    />
                    <button
                        className="list-button"
                        //onClick={}
                    >
                    List
                    </button>
                </form>     
                    <ol>
                    {this.state.listDataHolder.map(listElement  => (
                            <li className= "li" key={listElement.foursquareId}>
                                {listElement.name}
                            </li>
                            ))
                    } 
                    </ol>
            </aside>
            );
    }
}

export default SidebarContainer;