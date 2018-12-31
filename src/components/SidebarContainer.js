import React, { Component } from 'react';
import './SidebarContainer.css';

class SidebarContainer extends Component {
    constructor(props) {
        super(props);
           
            this.state = {
                query: '',
                listOfLokalElements: '',
                newLocals:'',
                filteredLocals:'',
                showingFullList : true
                //shownMarkers: [],
                //singleMarker: []
            };
    }

    componentWillMount() {
        
        this.setState({
            filteredLocals : this.props.newLocals
            
        })
        console.log('after ComponentWillMount the value of newLocals in state:' + this.state.newLocals)
        
    }
    
    toggleList = () => {
        this.setState({ showingFullList : !this.state.showingFullList});
        this.setState({venue : this.props.newLocals});
    }; 
   
    render() {

        return (
            
            <aside tabIndex='0' className ="sidebarContainer" >
                <form className="form">
                    <input 
                        className="input-field" 
                        type="text" 
                        id="search_box"
                        onChange={ this.props.filterLocals}    
                        placeholder="Search for a café by name..."
                        aria-labelledby="filter cafés by name"
                    />
                    
                    <button
                        className="btn-toggle"
                        onClick= {() =>this.toggleList()}
                    >
                    Show Suggestion List
                    </button>
                    {this.props.error && 
                        <div className="error"><span aria-labelledby="error message"><strong>An error occured:</strong>{this.props.error}</span></div>}
                </form>     
                    {(           
                        <ul className ="sidebar-list">
                            {this.state.showingFullList &&
                            this.props.venues.map((singleLocal) => (
                                <li
                                key={singleLocal.venue.id}
                                className= "li"
                                onClick={() => this.props.clickLocalFromList(singleLocal.venue.id)}
                                >
                                <h3><span aria-labelledby="location name"><strong>{singleLocal.venue.name}</strong></span></h3>
                                <p><span aria-labelledby="location address">{singleLocal.venue.location.address}</span></p>
            
                                
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