import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsData: [],
      authorName: [],
      titleHeader: '',
      value: '',
      
    }
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.filterForInput = this.filterForInput.bind(this);
    this.handleSubmitForAuthor = this.handleSubmitForAuthor.bind(this);
    
    
    
  }

  

componentDidMount() {
  this.fetchingFrontPageStories();
  this.handleSubmitForAuthor();
}

// Sets 'value' state to what is typed inside of the input field
handleSearch(event) {
  // event.preventDefault();
  this.setState( {value: event.target.value} );
}


handleSubmit = (e) => {
  const getAuthorRadio = document.getElementById('author-id');
  const getTitleRadio = document.getElementById('title-id');
  e.preventDefault();
  if(!getAuthorRadio.checked && !getTitleRadio.checked) {
    alert("No options Selected");
  } else if (getAuthorRadio.checked) {
    console.log("Author Radio checked");
    this.handleSubmitForAuthor();
  } else if (getTitleRadio.checked) {
    console.log("Title radio checked");
  }
}

// Stores all stories by specific author inside of the authorName state.
handleSubmitForAuthor = () => {
  console.log("Accessed this function and this is state" + this.state.value);
  const authorURL = `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.value}`;
  fetch(authorURL)
    .then((res) => {return res.json() })
    .then((res) => { console.log(res); this.setState( {authorName: res.hits}) })
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
            <div id="title-button">Title<input id="title-id" name="filter" type="radio"></input></div>
            <div id="author-button">Author<input id="author-id" name="filter" type="radio"></input></div>
          </div>
          
          <input 
          type = "text"
          id="story-search" 
          placeholder="Search front page stories by keywords" 
          value={this.state.value}
          onChange={this.handleSearch}>
          </input>

          <button id="search-button" 
          >Search
          </button>
        </form>

        <div className="showing-results">
          {this.state.authorName.map ((author, index) => (
            <div key={index}>
              <p>
                <a href={author.url}>{author.title}</a>
                <div>Created By: {this.state.value}</div>
                <div>Date: {author.created_at}</div>
              </p>
            </div>
          ))}
        </div>
        
          {/* {this.state.newsData.map((item,index) => {
            return <p key={index}><a href={item.url}>{item.title}</a></p>
        })} */}
      </div>
      

    </div>
    );
  }
}

export default App;
