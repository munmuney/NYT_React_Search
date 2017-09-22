import axios from "axios";

var APIKey = '852b931521a545cf8a58a79caf1b8031';

var helpers = {

  runQuery: function(topic, beginYear, endYear)  {

    var topic = topic.trim();
    var beginYear = beginYear.trim() + "0101";
    var endYear = endYear.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': APIKey,
          'q': topic,
          'begin_date': beginYear,
          'end_date': endYear
      }
    })
    .then(function(results) {
      return results.data.response;
    });
  },

  getSaved: function() {
    return axios.get('/api/saved')
      .then(function(results) {
        return results;
      });
  },

  postSaved: function(title, date, url) {
    var newArticle = {title: title, date: date, url: url};
    
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        return results._id;
      })

  },

  deleteSaved: function(title, data, url) {
    return axios.delete('/api/saved', {
      params: {
          'title': title,
          'data': data,
          'url': url,
      }
    })
    .then(function(results){
      return results;
    });
  }

}

module.exports = helpers;
