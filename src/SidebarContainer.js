import React, { Component } from 'react';
//import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';
//import {locals} from './localsList.js';
//import ListItemDetails from './ListItemDetails';

class SidebarContainer extends Component {
    constructor(props) {
        super(props);
           
            this.state = {
                query: '',
                listOfLokalElements: '',
                newLocals:'',
                filteredLocals:''
               //ElementColorDefault : true
                //shownMarkers: [],
                //singleMarker: []
            };
    }

     /*changeSelectedElementColor(){
        this.setState({ElementColorDefault : !this.state.ElementColorDefault})
    }
    
   //listOfSelectedLocals = [];
   
    
   updateQuery = (query) => {
        this.setState({query: query})
    }
   
*/
    componentWillMount() {
        
        this.setState({
            filteredLocals : this.props.newLocals
            
        })
        console.log('after ComponentWillMount the value of newLocals in state:' + this.state.newLocals)
        
    }
     
  /*/BUG
  filterLocals  = () => {
        //let listOfLokalElements =[];
        console.log(document.getElementById('search_box').value);
        //console.log('this.state.query értéke:' + this.state.query);
        let userValue = document.getElementById('search_box').value;
        var new_locals = [];
         //update name in case of newLocals: this.props.newLocals
       this.state.newLocals.forEach = local=> {
            //console.log('megadott érték:'+userValue);
            //console.log('keresett érték:'+local.name);
            if (local.name.toLowerCase() === userValue.toLowerCase()){
                //update name in case of newLocals: this.props.newLocals
               new_locals.push(local);
               console.log('volltreffer');
            }
            else {
                console.log('There is no cafe')
            }
        };
        this.setState({ newLocals : new_locals});
        
        console.log('value of newLocals:' + this.state.newLocals.name);
*/
        /*this.setState({query: userValue});
    //this.props.locals.forEach(function (LokalElement) { 
        let listOfLokalElements = [];
       
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
       
   }
     */ 

   
    render() {
       
        console.log('this.state.filteredLocals: ' + this.state.filteredLocals.venue);

        /*/console.log('Props', this.props)
        let showingListOfLocals;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            console.log('value of current query: ' + this.state.query)
            showingListOfLocals = this.state.newLocals.filter((local) => 
                match.test(local.name));               
            } else {
                showingListOfLocals = locals;
            };
        //Passing showingListOfLocals array to App.js
       */
        //let li_class = this.state.ElementColorDefault ? ".Sidebar-list li" : ".Sidebar-list li_selected";
       

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
            
            <aside tabIndex='0' className ="sidebarContainer" >
                <form className="form">
                    <input 
                        className="input-field" 
                        type="text" 
                        id="search_box"
                        //value={this.state.query} 
                        onChange={ this.props.filterLocals}  
                        //onChange={event => this.updateQuery(event.target.value) }   
                        placeholder="Search fo café by name..."
                        aria-labelledby="filter cafés by name"
                    />
                    <button
                        className="list-button"
                        //onClick={}
                    >
                    List
                    </button>
                </form>     
                    {(//https://stackoverflow.com/questions/46424537/reactjs-error-objects-are-not-valid-as-a-react-child
                        //BUG: TypeError: Cannot read property 'map' of undefined
                        <ul className ="sidebar-list">
                            {this.props.venues.map((singleLocal) => (
                                <li
                                key={singleLocal.venue.id}
                                className= "li"
                                onClick={() => this.props.clickLocalFromList(singleLocal.venue.id)}
                                >
                                <h2><span aria-labelledby="location name"><strong>{singleLocal.venue.name}</strong></span></h2>
                                <p><span aria-labelledby="location address">{singleLocal.venue.location.address}</span></p>
                                <p><span aria-labelledby="location p.box">{singleLocal.venue.location.formattedAddress[1]}</span></p>
                                <p><span aria-labelledby="GPS coordinates">GPS coordinates:</span></p> 
                                <p><span aria-labelledby="lat">lat:{singleLocal.venue.location.labeledLatLngs[0].lat}</span>, <span aria-labelledby="lng">lng:{singleLocal.venue.location.labeledLatLngs[0].lng}</span></p>
                                <p />
                                {this.props.error}
                                </li>
                                ))}
                            </ul>
                            )
                    }
                            
            </aside>
        );
    }
}

export default SidebarContainer;

//add css: https://stackoverflow.com/questions/41978408/changing-style-of-a-button-on-click
// TODO: add this.changeColor.bind(this) to onClick