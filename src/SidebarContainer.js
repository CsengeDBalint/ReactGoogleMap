import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';

class SidebarContainer extends Component {
    constructor(props) {
        super(props); 
            this.state = {
                query:'',
                listOfLokalElements: '',
                newLocals:''
                //shownMarkers: [],
                //singleMarker: []
            };

        //this.filterLokals = this.filterLokals.bind(this);
    
    }

   listOfSelectedLocals = [];
   /*
    updateQuery = (query) => {
        this.setState({query: query})
    }
    
    clearQuery = () => {
        this.setState({ query: '' })
    }
    */
  
   filterLocals  = () => {
        let listOfLokalElements = [];
       
        //console.log(document.getElementById('search_box').value);
        //console.log('this.state.query értéke:' + this.state.query);
        let userValue = document.getElementById('search_box').value;
        var new_locals = [];

        this.props.locals.forEach(function(local) {
            //console.log('megadott érték:'+userValue);
            //console.log('keresett érték:'+local.name);
            if (local.name === userValue){
               new_locals.push(local);
               console.log('talalat');
            }
        }); 
        this.setState({newLocals:new_locals}); 
        console.log('new_locals értéke:' + new_locals);

        /*this.setState({query: userValue});
    //this.props.locals.forEach(function (LokalElement) {
            if (this.state.query) {
               // console.log('Query tartalma' + this.state.query)
                //const match = new RegExp(escapeRegExp(this.state.query), 'i');
                //console.log('match értéke:' + match);
                console.log('props.local értéke' + this.props.locals);
                 /*test = this.props.locals.filter(function test(local) {
                   if (local === userValue){
                       return 'meg van';
                   }
                   else {
                       return 'nincs';
                   }
                    
                    //match.test(local.name));               
                    listOfLokalElements.push(listOfLokalElements)
                 } ); 
               
                
                //this.local.marker.setVisible(true);
                //search for Foursq_api(id)
            } else {
                listOfLokalElements = this.props.locals;

                //this.local.marker.setVisible(false);
            };
         // });

        this.setState({
            listOfLokalElements: listOfLokalElements,
            //query : query
        });
        */ 
    }
  

    render() {
        /*console.log('Props', this.props)

        let showingListOfLocals;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
    
            showingListOfLocals = this.props.locals.filter((local) => 
                match.test(local.name));               
            } else {
                showingListOfLocals = this.props.locals;
            };
        //Passing showingListOfLocals array to App.js
        */
       

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
                        id="search_box"
                        /*value={this.state.query} */
                        onChange={ this.filterLocals}
                        //onChange={event => this.updateQuery(event.target.value) }   
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
                    {this.state.newLocals.map((listElement) => (
                    <li className= "li" key={listElement.foursquareId} selectedLocal = {this.props.selectedLocalVenue} onClick = {this.props.select}>
                        {listElement.name}
                        
                    </li>))
                    }
                </ul>
            </aside>
        );
    }
}

export default SidebarContainer;