import React from "react";
import Router from "react-router";


import helpers from "../../utils/helpers";


class Results extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      url: "",
      pubdate: ""     
    }
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(item, event) {
    helpers.postSaved(item.headline.main, item.pub_date, item.web_url)
      .then(function(data) {
    }.bind(this))
  }

  render() {
    const styleType = {
      listStyleType: "none"
    };

    if (!this.props.results.hasOwnProperty('docs')){

      return (
        <li style={styleType}>
          <h6>
            <span><em>Search for articles to begin.</em></span>
          </h6>

        </li>
      )
    }

    else {

      const style = {
        padding: 10,
        background:"lemonchiffon",
        margin: 20
      };

      const style2 = {
        marginLeft:10
      } ;    

      var articles = this.props.results.docs.map(function(article, index) {

        return (


            <div key={index}>

              <li className="card hoverable" style={style}>

                <h4>
                  <span><em>{article.headline.main}</em></span>
                  <span className="right">
                    <a href={article.web_url} target="_blank"><button className="btn">View Article</button></a>

                    <button style={style2} className="btn" onClick={this.handleClick.bind(this, article)}>Save</button>
                  </span>
                </h4>
              
                <p>Date Published: {article.pub_date}</p>
              </li>
            </div>
        )
      }.bind(this))
    }

    return (
      <div>


                <h4><strong>Results</strong></h4>
              
                <ul>

                  {articles}

                </ul>


      </div>
    )
  }
}


export default Results;

