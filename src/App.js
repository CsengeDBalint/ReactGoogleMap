import React, { Component } from 'react';
import './App.css';
//import escapeRegExp from 'escape-string-regexp';

import Header from './Header';
import SidebarContainer from './SidebarContainer';
import {locals} from './localsList.js';

class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
      allMarkers: [],
      infoWindows : [],
      selectedLocalVenue: [],
      localsVenues:[],
      //cafeLocals:[],
      error: null
        };
        
        //this.initMap = this.initMap.bind(this);
        

    }

    componentDidMount = () => {
        //fetch(`https://api.foursquare.com/v2/venues/4b058890f964a520afcd22e3?client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
        fetch(`https://api.foursquare.com/v2/venues/explore?ll=48.208418,16.373231&query=cafe&client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD4&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
            
            .then(response => response.json())
            .then(data => {
                    this.setState({localsVenues: data.response.groups[0].items});
                    console.log(data.response.groups[0].items)
                })
            .catch(error => {
                console.log("Error : " + error)
        }) ;

    // Connect initMap() to the global window
    window.initMap = this.initMap;
    
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLVCGUR9jUVe3DkVKspecXg0pCgMK1E1M&callback=initMap')
    
    
    
    }


    /*/ Fetch data with Foursquare Api
    selectLocalVenue = venue =>{
        const foursquare_client_id = "FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD4";
        const foursquare_client_secret = "EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F";
        const foursquare_version = 20181108;

        const venue_id = locals[0]['foursquareId'];
        
        //https://foursquare.com/developers/explore#req=venues%2F49eeaf08f964a52078681fe3%3F
        //(`https://api.foursquare.com/v2/venues/${this.state.locals.foursquareId}&client_id=${foursquare_client_id}&client_secret=${foursquare_client_secret}&v=${foursquare_version}`)
        //(`https://api.foursquare.com/v2/venues/explore?ll=48.208418,16.373231&client_id=${foursquare_client_id}&client_secret=${foursquare_client_secret}&v=${foursquare_version}`)
        
        const controller = new AbortController();
        const signal = controller.signal;

        this.setState({
            //selectedLocalVenue: venue,
            error: null
        });
        //TODO: output the venue details in the ListItemDetails
        //TODO: improve error handling See: The Road to learn React page 110



    if(venue) {
        fetch(`https://api.foursquare.com/v2/venues/${venue_id}?client_id=${foursquare_client_id}&client_secret=${foursquare_client_secret}&v=${foursquare_version}`, { signal })
        //fetch(`https://api.foursquare.com/v2/venues/explore?ll=48.208418,16.373231&section=coffee&client_id=${foursquare_client_id}&client_secret=${foursquare_client_secret}&v=${foursquare_version}`, { signal })
        
        .then(response => response.json())
        .then(data => {
            //https://flaviocopes.com/fetch-api/#
            setTimeout(() => controller.abort(), 5 * 1000)
            
            if (data.meta.code === 200) {
                console.log('Data is loading...');
                this.setState({selectedLocalVenue: data.response.venue.contact})
            } else {
                console.log('Problem during loading data:' + data.meta.errorType + data.meta.errorDetail)
                console.log('current venue_id:' + {venue_id})
                this.setState({error: data.meta.errorType})   
            }
            })
        .catch(abortError => {
                if (abortError.name === 'AbortError') {
                    console.error('Fetch aborted');
                    this.setState({error: abortError.name})  
                } else {
                    console.error('Another error', abortError)
                }
            this.setState({ error: abortError })
        }) ;

        /*this.setState({
            selectedLocalVenue: selectedLocalVenue
        });
        
        console.log('selectedLocalVenue:' + this.state.selectedLocalVenue);
        console.log('errors value: '+ this.state.error)


    }
    };
    */


   //Initialize and add the map
   initMap = () => {
        const { allMarkers } = this.state;

        // The map, centered at Vienna
        var map = new window.google.maps.Map(
            document.getElementById('map'), 
            {zoom: 14, 
            center: {lat: 48.208418, lng: 16.373231}
            });
         
        //Create infowindow
        var infowindow = new window.google.maps.InfoWindow({content: 'Information about your Café'});
                
    
        //Show up the markers
            locals.forEach(singleLocal =>{  
            var marker = new window.google.maps.Marker({
            position: singleLocal.position,
            map: map,
            //map: window.mapObject;
            title: singleLocal.name,
            //Custom Attribute
            //https://stackoverflow.com/questions/2564320/adding-ids-to-google-map-markers
            //retrieve the data: marker.get('store_id');
            store_id: singleLocal.foursquareId
            })
            //console.log('markers id:' + marker.store_id);
             //Push marker in the array that holds markers showing up on our map
             this.state.allMarkers.push(marker);

             this.setState({allMarkers:allMarkers});
            
            
            
            let content = `<div><h2>${singleLocal.name}</h2><p><strong>Address:</strong>${singleLocal.address}</p></p></div>`; 
            //Open infowindow 
            marker.addListener('click',() => {
                infowindow.setContent (content);
                infowindow.open(map, marker);
                
            });
            
            });
        
           


         /*/Update markers on the map according search bar input
        //https://developers.google.com/maps/documentation/javascript/examples/marker-remove         
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
    }

    render() {
        
        return (
        <div>
            <Header />
            <SidebarContainer   locals = {locals}
                                //cafeLocals = {this.state.cafeLocals}
                                select = {this.selectLocalVenue}
                                selectedLocal = {this.state.selectedLocalVenue}
                                error ={this.state.error}
                                selectedLocalVenue = {this.state.selectLocalVenue}
                                localsVenues = {this.state.localsVenues}
                                //filterMarkers={this.filterMarkers}
                                />
            <div id='map'></div>
        </div>
        )
    }
}

export default App;

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  
  //TODO: add errormessage
}