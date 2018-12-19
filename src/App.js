import React, { Component } from 'react';
import './App.css';
//import escapeRegExp from 'escape-string-regexp';

import Header from './Header';
import SidebarContainer from './SidebarContainer';

class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
        allMarkers: [],
      //infoWindowOpened : false,
      //activeMarker : '',
      infoWindows : [],
      locals: [
        {
            foursquareId: "4b058890f964a520afcd22e3",
            name:"Café Central",
            position: { lat: 48.21034849634383, lng: 16.36539101600647},
            address: "Herrengasse 14 (Strauchg.)",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b058890f964a520a8cd22e3",
            name:"Café Landtmann",
            position: { lat: 48.21150494287856, lng: 16.36135697364807},
            address: "Universitätsring 4",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4af9b000f964a520561322e3",
            name:"phil",
            position: { lat: 48.200196163700625, lng: 16.36121911866486},
            address: "Gumpendorfer Str. 10-12",
            postalcode: "1060 Vienna"
        },
        {
            foursquareId: "4b058890f964a520a9cd22e3",
            name:"Café Mozart",
            position: { lat: 48.2043173992853, lng: 16.368986707234214},
            address: "Albertinaplatz 2",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b064b09f964a5206dea22e3",
            name:"Café Sacher",
            position: { lat: 48.203857, lng: 16.370144},
            address: "Philharmonikerstr. 4",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4c39dab018e72d7ffccd1af5",
            name:"Motto am Fluss",
            position: { lat: 48.2122554233485, lng: 16.377926837416943},
            address: "Schwedenplatz 2",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b058890f964a520b1cd22e3",
            name:"Demel – K.u.K. Hofzuckerbäcker",
            position: { lat: 48.20849018101388, lng: 16.367204970966302},
            address: "Kohlmarkt 14",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b058890f964a520adcd22e3",
            name:"Café Sperl",
            position: { lat: 48.199844, lng: 16.361171},
            address: "Gumpendorfer Str. 11",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b9e3a64f964a52063d336e3",
            name:"Le Bol",
            position: { lat: 48.206469, lng: 16.370575},
            address: "Neuer Markt 14",
            postalcode: "1010 Vienna"
        },
        {
            foursquareId: "4b1a96a5f964a520ebec23e3",
            name:"Kleines Café",
            position: { lat: 48.20647558079986, lng: 16.374263927297903},
            address: "Franziskanerplatz 3",
            postalcode: "1010 Vienna"
        }
    ]
        };

        //this.initMap = this.initMap.bind(this);
        

    }

    componentDidMount = () => {
    
    // Connect initMap() to the global window
    window.initMap = this.initMap;
    
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLVCGUR9jUVe3DkVKspecXg0pCgMK1E1M&callback=initMap')
    }

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
            this.state.locals.forEach(singleLocal =>{  
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
            console.log('markers id:' + marker.store_id);
             //Push marker in the array that holds markers showing up on our map
             this.state.allMarkers.push(marker);

             this.setState({allMarkers:allMarkers});
            
            
            
             //https://stackoverflow.com/questions/1875596/have-just-one-infowindow-open-in-google-maps-api-v3
            //https://stackoverflow.com/questions/24951991/open-only-one-infowindow-at-a-time-google-maps 
            
             //Open infowindow 
            marker.addListener('click',() => {
                //infowindow.close();
                infowindow.setContent (`${singleLocal.name}`);
                infowindow.open(map, marker);
                //this.setState({infoWindowOpened : true, activeMarker: marker});
                //this.state.infoWindows.push(infowindow);
                
            });
            
                
            infowindow.addListener('clickout', function () {
            // marker.setIcon(defaultIcon);
            infowindow.setMarker(null);
            // window.google.maps.event.clearInstanceListeners(marker);
            });
            
            
            
           
          
            });
        
            /*marker.addListener(marker, "click", function(event) {
                for (let i = 0; i < this.state.infoWindows.length; i++ ) { 
                     this.state.infoWindows[i].close();
                }
            });
            */
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
            <SidebarContainer   locals ={this.state.locals}
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