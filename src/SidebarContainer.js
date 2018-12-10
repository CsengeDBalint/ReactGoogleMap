import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import './SidebarContainer.css';

class SidebarContainer extends Component {
    
    state = {
    query:'',
    listDataHolder: [],
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

    udpateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    /*clearQuery = () => {
        this.setState({ query: '' })
    }
   */
   
    render() {

        let showingListOfLocals;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
    
            showingListOfLocals = this.state.locals.filter((local) => 
                match.test(local.name));               
            } else {
                showingListOfLocals = this.state.locals;
            } 
            

        return (
            <aside className ="sidebarContainer" >
                <form className="form">
                {JSON.stringify(this.state)}
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