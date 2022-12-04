import React from "react";

class ShoeForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                manufacturer: " ",
                modelName: " ",
                color: " ",
                pictureUrl: " ",
                bin: [],
            }
            this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
            this.handleModelNameChange = this.handleModelNameChange.bind(this);
            this.handleColorChange = this.handleColorChange.bind(this);
            this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
            this.handleBinChange = this.handleBinChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleManufacturerChange(event) {
            const value = event.target.value
            this.setState({manufacturer: value});
        }
        handleModelNameChange(event) {
            const value = event.target.value
            this.setState({modelName: value});
        }
        handleColorChange(event) {
            const value = event.target.value
            this.setState({color: value});
        }
        handlePictureUrlChange(event) {
            const value = event.target.value
            this.setState({pictureUrl: value});
        }
        handleBinChange(event) {
            const value = event.target.value
            this.setState({bin: value});
        }

        async handleSubmit(event) {
            event.preventDefault();
            const data = {...this.state};
            data.model_name = data.modelName;
            data.picture_url = data.pictureUrl;
            delete data.modelName;
            delete data.pictureUrl;
            console.log(data);
            const shoeUrl = "http://localhost:8080/api/shoes/";
            const shoeConfig = {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(shoeUrl, shoeConfig);
            if (response.ok) {
                const newShoe = await response.json();
                console.log(newShoe);
                const cleared = {
                    manufacturer: " ",
                    modelName: " ",
                    color: " ",
                    pictureUrl: " ",
                    bin: " ",
                };
                this.setState(cleared);
            }
        }

        async componentDidMount() {
            const url = "http://localhost:8100/api/bins/"

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({bins: data.bins});
            }
        }

    render() {
        return (
            <div className="container">
                <div className="row"></div>
                    <div className="offset 3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new pair of shoes</h1>
                            <form onSubmit={this.handleSubmit} id="create-shoe-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="Manufacturer" require type="text" name="manufacturer" id="manufacturer" className="form-control" maxLength="50"/>
                                    <label htmlFor="manufacturer">Manufacturer</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleModelNameChange} value={this.state.modelName} placeholder="Model Name" require type ="text" name="modelName" id="modelName" className="form-control" maxLength="50"/>
                                    <label htmlFor="modelName">Model Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleColorChange} value={this.state.color} placeholder="#000000" require type="color" name="color" id="color" className="form-control form-control-color"/>
                                    <label htmlFor="color">Color</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture URL" require type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
                                    <label htmlFor="pictureUrl">Picture URL</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleBinChange} value={this.state.bin} required id="bin" name="bin" className="form-select">
                                        <option value="">Choose a bin</option>
                                        {this.state.bins.map(bin => {
                                            return (
                                            <option key={bin.bin_number} value={bin.bin_number}>
                                                {bin.bin_number}
                                            </option>
                                        );
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create Choe</button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}


export default ShoeForm;
