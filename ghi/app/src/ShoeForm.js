import React from "react";

class ShoeForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                manufacturer: "",
                modelName: "",
                color: "#000000",
                pictureUrl: "",
                bins: [],
            }
            this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
            this.handleModelNameChange = this.handleModelNameChange.bind(this);
            this.handleColorChange = this.handleColorChange.bind(this);
            this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
            this.handleBinChange = this.handleBinChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        async handleSubmit(event) {
            event.preventDefault();
            const data = {...this.state};
            data.model_name = data.modelName;
            data.picture_url = data.pictureUrl;
            delete data.modelName;
            delete data.pictureUrl;
            delete data.bins
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
                    manufacturer: "",
                    modelName: "",
                    color: "#000000",
                    pictureUrl: "",
                    bin: "",
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


    render() {
        return (
            <div className="container">
                <div className="row"></div>
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new pair of shoes</h1>
                            <form onSubmit={this.handleSubmit} id="create-shoe-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" maxLength="50" />
                                    <label htmlFor="manufacturer">Manufacturer</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleModelNameChange} value={this.state.modelName} placeholder="Model Name" required type ="text" name="modelName" id="modelName" className="form-control" maxLength="50" />
                                    <label htmlFor="modelName">Model Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture URL" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" maxLength="2000" />
                                    <label htmlFor="pictureUrl">Picture URL</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleBinChange} value={this.state.bin} required id="bin" name="bin" className="form-select">
                                        <option value="">Choose a bin</option>
                                        {this.state.bins.map(bin => {
                                            return (
                                            <option key={bin.id} value={bin.href}>
                                            {bin.closet_name}, {bin.bin_number}
                                            </option>
                                        );
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3" >
                                    <input onChange={this.handleColorChange} value={this.state.color} input-placeholder-color="#000000" type="color" id="color" className="form-control form-control-color"/>
                                    <label htmlFor="color">Shoe Color</label>
                                </div>
                                <button className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}


export default ShoeForm;
