import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsData: [],
      titleHeader: [],
      value: '',
      authorName: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.filterForInput = this.filterForInput.bind(this);
    
  }

  

componentDidMount() {
  this.fetchingFrontPageStories();
  // this.handleSearch();
}

// Sets 'value' state to what is typed inside of the input field
handleSearch(event) {
  this.setState( {value: event.target.value} );
}


handleSubmit(event) {
  event.preventDefault();
  alert(`${this.state.value} was submitted`);
  let findAuthor = this.state.newsData.title.find(this.state.value) 
  this.setState({value: ''})
  // this.filterForInput();
}

// Starts to filter what is typed in input field and searched within the 'newsData' state.
// filterForInput() {
//   console.log("Function Working");
//   console.log(this.state.newsData);
  
// }








fetchingFrontPageStories () {
  fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
  .then((res) => { return res.json() })
  .then((res) => { console.log(res); this.setState( {newsData: res.hits})})
  .catch(error => console.log("Parsing failed", error));
}




  render () {
    return (
    <div className="App">
      <div className="news-data">

        <form onSubmit={this.handleSubmit}>

          <input 
          id="story-search" 
          placeholder="Search front page stories by keywords" 
          value={this.state.value}
          onChange={this.handleSearch}>
          </input>

          <button id="search-button" 
          >Search
          </button>


        </form>
        
          {/* {this.state.newsData.map((item,index) => {
            return <p key={index}>{item.title}</p>
        })} */}
      </div>
      

    </div>
    );
  }
}

export default App;
