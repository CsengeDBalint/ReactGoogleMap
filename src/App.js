import React, { Component } from 'react';
import './App.css';

import Header from './Header';

class App extends Component {
  state = {
    listedMarkers: [],
    infoWindowOpened : false,
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

componentDidMount = () => {
    
    // Connect initMap() to the global window
    window.initMap = this.initMap;
    
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLVCGUR9jUVe3DkVKspecXg0pCgMK1E1M&callback=initMap')
  }
   //Initialize and add the map
   initMap = () => {
    // The map, centered at Vienna
    const map = new window.google.maps.Map(
        document.getElementById('map'), 
        {zoom: 14, 
          center: {lat: 48.208418, lng: 16.373231}
        });

      //Show up the markers
     
     this.state.locals.map(singleLocal =>{  
        let marker = new window.google.maps.Marker({
        position: singleLocal.position,
        map: map,
        title: singleLocal.name
      })
        this.state.listedMarkers.push(marker);
      
   
       //Create infowindow 
       let contentString = '<div className="contentInfoWindow">'+
        '<h3 className="firstHeading">marker.title</h3>'+
        '<div id="bodyContent">'+
        '<p><b>`${singleLocal.adress}`</b></p>'+
        '</div></div>';
      //https://stackoverflow.com/questions/1875596/have-just-one-infowindow-open-in-google-maps-api-v3
       let infowindow = new window.google.maps.InfoWindow({
      content: contentString
      })

      //Open infowindow 
     marker.addListener('click', function() {
            infowindow.setContent (contentString);
            infowindow.open(map, marker)
      })
    
    })
}
     

  render() {
    return (
      <div>
        <Header />
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