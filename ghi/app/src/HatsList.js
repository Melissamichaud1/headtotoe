import React from 'react';

class HatsList extends React.Component {
    state = {
        hats: []
    }

    async getHatsList() {
        const response = await fetch("http://localhost:8090/api/hats")
        if(response.ok) {
            const data = await response.json();
            const hats = data.hats;
            this.setState({hats: hats});
        }
    }


    async componentDidMount() {
        this.getHatsList();
    }

    async handleDelete(event) {
        const url = `http://localhost:8090/api/hats/${event}`;
        await fetch(url, {method: "DELETE"})
        this.getHatsList()
    }

    render() {
        return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Style Name</th>
                    <th>Fabric</th>
                    <th>Color</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {this.state.hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{ hat.style_name }</td>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.color }</td>
                            <td>{ hat.location }</td>
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
