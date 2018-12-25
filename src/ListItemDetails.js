import React from 'react';

//TODO: add props
class ListItemDetails ({venue}, props) => {
    if (venue) {
        return (
            <div className = "item-details">
                <p>>Price: </p>
                <p>>Can you visit it now?: </p>
            </div>
        )
    } else { 
        return (this.props.error)
    }
}

export default ListItemDetails