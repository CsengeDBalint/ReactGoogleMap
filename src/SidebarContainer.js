import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';

class SidebarContainer extends Component {
    
    state = {
        query:''
    };

    udpateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    /*clearQuery = () => {
        this.setState({ query: '' })
    }
   */
   
    render() {
        console.log('Props', this.props)

        let showingListOfLocals;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
    
            showingListOfLocals = this.props.locals.filter((local) => 
                match.test(local.name));               
            } else {
                showingListOfLocals = this.props.locals;
            } 
            

        return (
            <aside className ="sidebarContainer" >
                <form className="form">
                    <input 
                        className="input-field" 
                        type="text" 
                        value={this.state.query} 
                        onChange={event => this.udpateQuery(event.target.value) && this.props.filterMarkers}  
                        placeholder="Search for café..." 
                    />
                    <button
                        className="list-button"
                        //onClick={}
                    >
                    List
                    </button>
                </form>     
                <ul className="Sidebar-list">
                    {showingListOfLocals.map((listElement) => (
                    <li className= "li" key={listElement.foursquareId}>
                        {listElement.name}
                    </li>))
                    }
                </ul>
            </aside>
        );
    }
}

export default SidebarContainer;