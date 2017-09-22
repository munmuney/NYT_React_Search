import React from "react";
import Router from "react-router";

import helpers from "../utils/helpers";


class Saved extends React.Component {
  constructor() {
    super();

    this.state = {
      savedArticles: ""      
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    helpers.getSaved()
      .then(function(articleData){
        this.setState({
          savedArticles: articleData.data
        });

      }.bind(this))    
  }

  handleClick(item, event) {
    helpers.deleteSaved(item.title, item.date, item.url)
      .then(function(data){

      helpers.getSaved()
        .then(function(articleData){
          this.setState({
            savedArticles: articleData.data
          });

        }.bind(this))



      }.bind(this))    
  }

  render() {
    if (this.state.savedArticles == "") {
      const styleType = {
        listStyleType: "none"
      };

      return (
        <li style={styleType}>
          <h6>
            <span><em>There is currently no saved articles...</em></span>
          </h6>
        </li>
      )
    }

    else {
      const style = {
        padding: 10,
        background:"lemonchiffon",
        margin: 20,
        listStyleType: "none"
      };  

      const style2 = {
        marginLeft:10
      } ; 

      var articles = this.state.savedArticles.map(function(article, index) {

        return (
            <div key={index}>

              <li className="card hoverable" style={style}>
                <h4>
                  <span><em>{article.title}</em></span>
                  <span className="right" >
                    <a href={article.url} target="_blank"><button className="btn">View Article</button></a>
                    <button style={style2} className="btn" onClick={this.handleClick.bind(this, article)}>Delete</button>
                  </span>
                </h4>
                
                <p>Date Published: {article.date}</p>
              </li>
            </div>
        )
      }.bind(this))
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">

            
              <h4><strong>Saved Articles</strong></h4>


              <div>
                <ul>
                  {articles}
                </ul>
              </div>
            

          </div>
        </div>
      </div>
    )
  }
}




export default Saved;

