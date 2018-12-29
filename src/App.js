import React, { Component } from 'react';
import './App.css';
//import escapeRegExp from 'escape-string-regexp';

import Header from './Header';
import SidebarContainer from './SidebarContainer';
//import {locals} from './localsList.js';

class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
      allMarkers: [],
      infoWindows : [],
      selectedLocalVenue: [],
      localsVenues:[],
      newLocals: [],
      filteredLocals: '',
      venues: [],
      //cafeLocals:[],
      error: null
        };
        
        //this.initMap = this.initMap.bind(this);
        

    }

    componentDidMount = () => {
        //fetch(`https://api.foursquare.com/v2/venues/4b058890f964a520afcd22e3?client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
        fetch(`https://api.foursquare.com/v2/venues/explore?ll=48.208418,16.373231&query=cafe&limit=10&client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD4&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
            
            .then(response => response.json())
            .then(data => {
                    this.setState({
                        localsVenues: data.response.groups[0].items,
                        newLocals : data.response.groups[0].items
                    });
                    // Asynchronously load the Google Maps script, passing in the callback reference
                    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLVCGUR9jUVe3DkVKspecXg0pCgMK1E1M&callback=initMap')
                    window.initMap = this.initMap;

                    console.log(data.response.groups[0].items);
                    console.log('localsVenues in state:' + JSON.stringify(this.state.localsVenues));

                })
            .catch(error => {
                console.log("Error : " + error);
                alert("An error occured while fetching data by Foursquare Api" + error);
        }) ;
    
    
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

        this.setState({
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
            {zoom: 15, 
            center: {lat: 48.208418, lng: 16.373231}
            });
         
        //Create infowindow
        var infowindow = new window.google.maps.InfoWindow({content: 'Information about your Café'});
                
    
        //Show up the markers
            this.state.localsVenues.forEach(singleLocal =>{  
            var marker = new window.google.maps.Marker({
                position: {lat: singleLocal.venue.location.lat, lng: singleLocal.venue.location.lng},
                map: map,
                //map: window.mapObject;
                title: singleLocal.venue.name,
                //Custom Attribute
                //https://stackoverflow.com/questions/2564320/adding-ids-to-google-map-markers
                //retrieve the data: marker.get('store_id');
                store_id: singleLocal.venue.id,
                store_address: singleLocal.venue.location.address
                
            })
              
                //https://developers.google.com/maps/documentation/javascript/examples/marker-animations
                marker.addListener('click',this.clickLocalFromList);  
            
             //Push marker in the array that holds markers showing up on our map
             this.state.allMarkers.push(marker);

             this.setState({allMarkers:allMarkers});
            
            
            
            let content = `<div><h2>${marker.title}</h2><p><strong>Address:</strong>${marker.store_address}</p></p></div>`; 
            //Open infowindow 
            marker.addListener('click',() => {
                infowindow.setContent (content);
                infowindow.open(map, marker);
                
            });
            
            }); 
    }

     
    
    //Added animation to marker
    clickLocalFromList = (clickedLocal)=> {
        this.setState({
            selectedLokal: clickedLocal
        });

        this.state.allMarkers.map(marker => {
            console.log('clickedLocal:' +clickedLocal)
            if(marker.store_id ===clickedLocal) { 
                if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                
                setTimeout(function() {
                    marker.setAnimation(null)
                }, 2000);
              }

            }
        })
        
    }
    
//BUG
filterLocals  = () => {
    //let listOfLokalElements =[];
    console.log(document.getElementById('search_box').value);
    //console.log('this.state.query értéke:' + this.state.query);
    let userValue = document.getElementById('search_box').value;
    var new_locals = [];
     //update name in case of newLocals: this.props.newLocals
   this.state.newLocals.forEach (function (local) {
        //console.log('megadott érték:'+userValue);
        console.log('keresett érték:'+local.venue.location.name);
        if ( userValue.toLowerCase() === local.venue.location.name.toLowerCase()){
            //update name in case of newLocals: this.props.newLocals
           new_locals.push(local);
           console.log('volltreffer'); 
           
        }

        
    });
    console.log('value of newLocals:' + this.state.newLocals.name);
    this.setState({ filteredLocals : new_locals});
}

/*filterLocals = () =>{
    let userValue = document.getElementById('search_box').value;
    let venues = this.state.newLocals.filter((searchVenue) =>
            
        new RegExp(userValue, "i").exec(searchVenue.venue.name));
    this.setState({ newLocals : venues});
    //console.log(searchVenue.venue.name)
}*/

    render() {
        
        return (
        <div>
            <Header />
            <SidebarContainer   //locals = {locals}
                                //cafeLocals = {this.state.cafeLocals}
                                select = {this.selectLocalVenue}
                                //selectedLocal = {this.state.selectedLocalVenue}
                                //selectedLocalVenue = {this.state.selectLocalVenue}
                                filteredLocals = {this.state.filteredLocals}
                                clickLocalFromList = {this.clickLocalFromList}
                                error ={this.state.error}
                                filterLocals = {this.filterLocals}
                                venues = {this.state.venues}
                                newLocals= {this.state.newLocals}
                                />
            <div id='map' role='application'></div>
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
  
  script.onerror = function () {
    document.write('An error occured while loading Google Maps')
  };
}