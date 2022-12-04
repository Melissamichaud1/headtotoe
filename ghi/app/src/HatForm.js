import React from "react";

class HatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fabric: "",
      style_name: "",
      color: "",
      url: "",
      locations: [],
    };
    this.handleFabricChange = this.handleFabricChange.bind(this);
    this.handleStyleNameChange = this.handleStyleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  async handleCreate(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.locations;
    console.log(data);

    const hatsUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(hatsUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);

      const cleared = {
        fabric: "",
        style_name: "",
        color: "",
        url: "",
        location: "",
      };
      this.setState({ success: true })
      this.setState(cleared);
    }
  }

    // get data for locations
    async componentDidMount() {
    const url = "http://localhost:8100/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        this.setState({ locations: data.locations });
    }
    }

  handleFabricChange(event) {
    const value = event.target.value;
    this.setState({ fabric: value });
  }

  handleStyleNameChange(event) {
    const value = event.target.value;
    this.setState({ style_name: value });
  }

  handleColorChange(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleUrlChange(event) {
    const value = event.target.value;
    this.setState({ url: value });
  }

  handleLocationChange(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add A New Hat</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleFabricChange}
                    value={this.state.fabric}
                    placeholder="Fabric"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label htmlFor="name">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleStyleNameChange}
                    value={this.state.styleName}
                    placeholder="Style name"
                    required
                    type="text"
                    name="style_name"
                    id="style_name"
                    className="form-control"
                  />
                  <label htmlFor="room_count">Style</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleColorChange}
                    value={this.state.color}
                    placeholder="color"
                    required
                    type="text"
                    name="color"
                    id="color"
                    className="form-control"
                  />
                  <label htmlFor="city">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleUrlChange}
                    value={this.state.url}
                    placeholder="https://example.com/"
                    required
                    type="text"
                    name="url"
                    id="url"
                    className="form-control"
                  />
                  <label htmlFor="city">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleLocationChange}
                    value={this.state.location}
                    required
                    id="location"
                    name="location"
                    className="form-select"
                  >
                    <option value="">Choose a location...</option>
                    {this.state.locations.map(location => {
                      return (
                        <option
                          key={location.id}
                          value={location.href}
                        >
                          {location.closet_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HatForm;
