import React from 'react';

//TODO: add props
const ListItemDetails = ({selectedLocalVenue}, props) => {
   
    if (props.selectedLocalVenue) {
        return (
            <div className = "item-details">
                <p>>Price: {selectedLocalVenue.hours.status}</p>
                <p>>Can you visit it now?: </p>
            </div>
        )
    } else { 
        return (props.error)
    }
}

export default ListItemDetails