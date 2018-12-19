import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';

class SidebarContainer extends Component {
    constructor(props) {
        super(props); 
            this.state = {
                query:'',
                shownMarkers: [],
                singleMarker: []
            };

        //this.filterMarkers = this.filterMarkers.bind(this);
    
    }
    
    updateQuery = (query) => {
        this.setState({query: query})
    }

    /*clearQuery = () => {
        this.setState({ query: '' })
    }
    */
   
    /*/Update markers on the map according search bar input 
   filterMarkers =() =>{
    if (this.state.query) {
        this.props.locals.filter((singleMarker) =>
            test(singleMarker.name));
        singleMarker.marker.setVisible(true);
        this.state.shownMarkers.push(singleMarker);                  
    } else {
        singleMarker.marker.setVisible(false);
    };
    this.setState({
        'shownMarkers' : this.state.shownMarkers,
        'query' : this.state.query
        })
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
        
       

        /*/https://developers.google.com/maps/documentation/javascript/examples/marker-remove         
         let filterMarkers = (query) => {

            let { map, allMarkers } = this.state;
            let filteredMarkers;

            // Set all markers on the map by default
            allMarkers.map((singleMarker) =>{
            return singleMarker.setMap(map);
            })
        
        
            // Removes the markers from the map, but keeps them in the array.       
            if (query) {
            //this.setState({ query: query });
            const match = new RegExp(escapeRegExp(query), 'i')

            filteredMarkers = allMarkers.filter((local) =>
                //shownMarker.foursquareId == allMarkers.foursquareId;
                match.test(local.name)
                );
                this.setState({filteredMarkers : filteredMarkers})
            // Hide markers that are included in filteredMarkers array
            filteredMarkers.map((filteredMarker) => {
                return filteredMarker.setMap(null)
            })    
            return this.setState({ filteredMarkers: filteredMarkers })    
            console.log(this.state.filteredMarkers);
            } else {
            // If there is no query, show all markers
            this.setState({ query: '', filteredMarkers: allMarkers});

            allMarkers.map((singleMarker) => {
                return singleMarker.setMap(map)
            })
            }
        }
       */
        
    


        return (
            <aside className ="sidebarContainer" >
                <form className="form">
                    <input 
                        className="input-field" 
                        type="text" 
                        value={this.state.query} 
                        onChange={ event => this.updateQuery(event.target.value) && this.filterMarkers}  
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