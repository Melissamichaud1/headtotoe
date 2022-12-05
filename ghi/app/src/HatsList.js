import React from 'react';

// Calls the getHatsList() function which makes a call to the server to get the list of hats
// If response OK -> sets hats state to the list of hats
// Else -> sets hats state to an empty array
class HatsList extends React.Component {
    state = {
        hats: [],
        locations: []
    }

    async getHatsList() {
        const response = await fetch("http://localhost:8090/api/hats")
        if(response.ok) {
            const data = await response.json();
            const hats = data.hats;
            this.setState({hats: hats});
        }
    }



    // Calls the getHatsList() function to get list of hats from server
    // Sets the state of the component to the list of hats
    // Renders list of hats
    async componentDidMount() {
        this.getHatsList();
    }



    async handleDelete(event) {
        const url = `http://localhost:8090/api/hats/${event}`;
        // Uses await keyword to wait for the response from the server
        // Uses fetch() method to send a DELETE request to the server
        await fetch(url, {method: "DELETE"})
        // Uses the getHatsList() method to get the updated list of hats from the server
        this.getHatsList()
    }


    // Creating a table with a header row and columns
    // Mapping over the hats array and creating a new row for each hat
    // Using hat's id as the key for the row
    // Using the handleDelete function to create a button that will delete the hat when clicked
    // Using the buttons onClick attribute to call the handleDelete function
    render() {
        return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Style Name</th>
                    <th>Fabric</th>
                    <th>Color</th>
                    <th>Location</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {this.state.hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{ hat.style_name }</td>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.color }</td>
                            <td>{ hat.location.closet_name }, Shelf { hat.location.shelf_number}, Section { hat.location.section_number}</td>
                            <td><img src={ hat.url } width="100" height="90"/></td>
                            <td><button onClick={() => this.handleDelete(hat.id)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
  }
}

export default HatsList;
