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
  fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
  .then((res) => { return res.json() })
  .then((res) => { console.log(res); this.setState( {newsData: res.hits})})
  .catch(error => console.log("Parsing failed", error));
}




  render () {
    return (
    <div className="App">
      <div className="news-data">
        <form>
          <input id="story-search" placeholder="Search stories here"></input>
          <button>Search</button>
        </form>
          {this.state.newsData.map((item,index) => {
            return <p key={index}>{item.title}</p>
        })}
      </div>
      

    </div>
    );
  }
}

export default App;
