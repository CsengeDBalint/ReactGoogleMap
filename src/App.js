import React, { Component } from 'react';
import './App.css';
//import escapeRegExp from 'escape-string-regexp';

import Header from './components/Header';
import SidebarContainer from './components/SidebarContainer';
import Footer from './components/Footer';

class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
      allMarkers: [],
      selectedMarkers: [],
      infoWindows : [],
      selectedLocalVenue: [],
      localsVenues:[],
      newLocals: [],
      filteredLocals: '',
      venues: [],
      error: null,
      //markerDataError: ''
      //selectedLokal: '',
      //clickedLocal: '',    
    }}

    componentDidMount = () => {
        //fetch(`https://api.foursquare.com/v2/venues/4b058890f964a520afcd22e3?client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
        fetch(`https://api.foursquare.com/v2/venues/explore?ll=48.208418,16.373231&query=cafe&limit=10&client_id=FTPQMQKRBNIJJDPKNGWFMUHD3KBP1OIYX0YZ5BU250CILCD4&client_secret=EZ3ACLWE1RBXRJSHLQCE0RU4DIYJTQB1SOEVVIK10OFKCR1F&v=20181108`)
            .then(response => response.json())
            .then(data => {
                    this.setState({
                        //Saving to state two copies of the fetched data(for the list and for the filtering function)
                        localsVenues: data.response.groups[0].items,
                        newLocals : data.response.groups[0].items
                    });
                    // Asynchronously load the Google Maps script, passing in the callback reference
                    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLVCGUR9jUVe3DkVKspecXg0pCgMK1E1M&callback=initMap')
                    window.initMap = this.initMap;

                    console.log(data.response.groups[0].items);
                    //console.log('localsVenues in state:' + JSON.stringify(this.state.localsVenues));
                    //console.log(' newLocals state értéke:'+  this.state.newLocals[3].venue.name);
                })
            .catch(error => {
                this.setState({ error });
                //console.log("Error : " + error);
                //alert("An error occured while fetching data by Foursquare Api" + error);
        }) ;
    }

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
                title: singleLocal.venue.name,
                //Custom Attribute
                //https://stackoverflow.com/questions/2564320/adding-ids-to-google-map-markers
                //retrieve the data: marker.get('store_id');
                store_id: singleLocal.venue.id,
                store_address: singleLocal.venue.location.address,
                store_lat: singleLocal.venue.location.labeledLatLngs[0].lat,
                store_lng: singleLocal.venue.location.labeledLatLngs[0].lng
                
            })
             
            //Add eventlistener when clicked by a listelement
            //https://developers.google.com/maps/documentation/javascript/examples/marker-animations
            marker.addListener('click',this.clickLocalFromList);  
        
            //Push marker in the array that holds all "default" markers showing up on our map
            this.state.allMarkers.push(marker);

            this.setState({allMarkers:allMarkers});
        
            //Define infowindow's content
            let content = `<div><h2>${marker.title}</h2>
                            <p><strong>Address:</strong>${marker.store_address}</p>
                            <p>GPS coordinates: </p>
                            <p>lat:${marker.store_lat}, lng:${marker.store_lat}</p>
                            </div>`; 
            
            //Open infowindow 
            marker.addListener('click',() => {
                infowindow.setContent (content);
                infowindow.open(map, marker);
            
            });
            
            }); 
    }

    
    
    //Add animation to marker selected by a listelement
    clickLocalFromList = (clickedLocal)=> {
        //this.setState({
        //    selectedLokal: clickedLocal
        //});

        //If found the markers belonged the clicked listelement start BOUNCE animation 
        //if the marker is not already animated
        this.state.allMarkers.forEach(marker => {
            //console.log('clickedLocal:' +clickedLocal)
            if(marker.store_id ===clickedLocal) { 
                if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                
                //
                setTimeout(function() {
                    marker.setAnimation(null)
                }, 2000);
              }

            }
        })
        
    }
    
    //Filter locations through search form
    filterLocals = () =>{
        //console.log('allMarkers state: ' + this.state.allMarkers);

        let userValue = document.getElementById('search_box').value;
        
        let venues = this.state.newLocals.filter((searchVenue) =>   
            //new RegExp(userValue, "i").exec(searchVenue.venue.name));
            searchVenue.venue.name.toLowerCase().includes(userValue.toLowerCase()));
        
        this.setState({ localsVenues : venues});
    
        //console.log('allMarkers[0].store_id:'+this.state.allMarkers[0].store_id);
        //console.log('venues[0].venue.id:'+venues[0].venue.id); 
    
    //Keep synchron the shown markers on map with the shown list
        /*const currentMarkers = () => {
            for (let i = 0; i < venues.length; i++) {
            if (venues[i].venue.id !== this.allMarkers.store_id){
                this.marker.setVisible(false);   
            }
        }}     
        */
        //this.setState({ allMarkers : venues});
        //this.setState({ allMarkers: currentMarkers});
        //console.log('allMarkers state: ' + this.state.allMarkers);
        this.initMap();
    }


    render() {
        return (
        <div>
            <Header />
            <SidebarContainer   
                                select = {this.selectLocalVenue}
                                //selectedLocal = {this.state.selectedLocalVenue}
                                //selectedLocalVenue = {this.state.selectLocalVenue}
                                //filteredLocals = {this.state.filteredLocals}
                                clickLocalFromList = {this.clickLocalFromList}
                                error ={this.state.error}
                                filterLocals = {this.filterLocals}
                                venues = {this.state.localsVenues}
                                newLocals = {this.state.newLocals}
                                toggleList =  {this.toggleList}
                                />
            <div id='map' role='application'></div>
            <Footer />
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