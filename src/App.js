import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsData: []
    }
  }

componentDidMount() {
  this.fetchingStories();
}

fetchingStories () {
  fetch('http://hn.algolia.com/api/v1/search?query=foo&tags=story')
  .then((res) => { return res.json() })
  .then((res) => { console.log(res); this.setState( {newsData: res.hits})})
  .catch(error => console.log("Parsing failed", error));
}




  render () {
    return (
    <div className="App">
      <div>
        {this.state.newsData.map((item,index) => {
          return <div key={index}>{item.author}</div>
        })}
      </div>
      

    </div>
    );
  }
}

export default App;
