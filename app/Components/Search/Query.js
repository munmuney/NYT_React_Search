import React from "react";

class Query extends React.Component {
  constructor() {
    super(); 

    this.state = {
      search: "",
      start: "",
      end: ""      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit() {
    this.props.updateSearch(this.state.search, this.state.start, this.state.end);
    return false;    
  }

  render() {
    return (
      <div>
        <h4><strong>Search Article</strong></h4>

        <div className="row">
          <form className="col s12">

            <div className="row">
              <div className=" input-field col s12">
                <input type="text" value={this.state.value} className="validate" id="search" onChange= {this.handleChange} required/>
                <label htmlFor="search">Topic</label>
              </div>
            </div>

            <div className="row">                      
              <div className=" input-field col s12">
                <input type="text" value={this.state.value} className="validate" id="start" onChange= {this.handleChange} required/>
                <label htmlFor="start">Start Year (Required)</label>
              </div>
            </div>

            <div className="row">                      
              <div className=" input-field col s12">
                <input type="text" value={this.state.value} className="validate" id="end" onChange= {this.handleChange} required/>
                <label htmlFor="end">End Year (Required)</label>
              </div>
            </div>


            <div className="right">
              <button type="submit" className="btn waves-effect waves-light" onClick={this.handleSubmit}>Submit</button>
            </div>

          </form>

        </div>
      </div>
    )

  }
};



export default Query;

