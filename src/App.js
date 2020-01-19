import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsData: [],
      titleHeader: '',
      value: '',
      authorName: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.filterForInput = this.filterForInput.bind(this);
    
  }

  

componentDidMount() {
  this.fetchingFrontPageStories();
  // this.handleSearch();
}

// Sets 'value' state to what is typed inside of the input field
handleSearch(event) {
  // event.preventDefault();
  this.setState( {value: event.target.value} );
  console.log(this.state.value);

}



handleSubmit = (e) => {
  const getTitleButtonId = document.getElementById('title-button');
  const getAuthorButtonId = document.getElementById('author-button');
  const radioButtonName = document.getElementsByName('filter');
  e.preventDefault();
  
}



handleSubmitForAuthor = (e) => {
  const authorURL = 'http://hn.algolia.com/api/v1/search?tags=story,author_:USERNAME';
  e.preventDefault();
  fetch(authorURL)
  .then((res) => {return res.json() })
  .then((res) => {
    if(res.hits.title > 0) {
      this.setState( {authorName: res.hits.author})
    } else {
      alert("Author not found")
    }  
  })


}





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

          <div id="radio-buttons">
            <div id="title-button">Title<input name="filter" type="radio"></input></div>
            <div id="author-button">Author<input name="filter" type="radio"></input></div>
          </div>
          
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
            return <p key={index}><a href={item.url}>{item.title}</a></p>
        })} */}
      </div>
      

    </div>
    );
  }
}

export default App;
