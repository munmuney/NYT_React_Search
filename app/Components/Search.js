import React from "react";
import Router from "react-router";

import Query from "./Search/Query";
import Results from "./Search/Results";

import helpers from "../utils/helpers";


class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      queryTerm: "",
      startYear: "",
      endYear: "",
      results: {}
    }

    this.setQuery = this.setQuery.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.queryTerm != "" && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear)) {
      helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)

      .then(function(data) {
        if (data != this.state.results) {
          this.setState({
            results: data
          })
        }
      }.bind(this))
    }
  }

  setQuery(newQuery, newStart, newEnd) {
    this.setState({
      queryTerm: newQuery,
      startYear: newStart,
      endYear: newEnd
    });
  }
  
  render() {
    return(
      <div className="container">

        <Query updateSearch={this.setQuery} />

        <Results results={this.state.results}/>

      </div>

    )
  }

}



export default Search;

