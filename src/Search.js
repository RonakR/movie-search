import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lastPage: 0,
      lastSearch: '',
    }
  }

  // Updates query state as events trigger
  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  // Calls omdb API for movies 
  search() {
    const BASE_URL = 'http://www.omdbapi.com/';
    const API_KEY = 'f86c0e32'
    const uriEncodedQuery = encodeURIComponent(this.state.query);
    const page = this.state.lastSearch === this.state.query ? this.props.page : 1; // Change page number when new search query
    const FETCH_URL = `${BASE_URL}?s=${uriEncodedQuery}&apikey=${API_KEY}&page=${page}&r=json`;

    fetch(FETCH_URL)
    .then(res => res.json())
    .then(json => {
      // Check whether new search or more movies to an old search
      // update the last page as needed to help keep track of when component should update
      if (this.state.lastSearch === this.state.query) {
        this.setState({ lastPage: this.state.lastPage + 1});
        this.props.results({
          newSearch: false,
          movies: json.Search,
          hasMoreMovies: json.Response,
        });
      } else {
        this.setState({
          lastPage: 1,
          lastSearch: this.state.query,
        });
        this.props.results({
          newSearch: true,
          movies: json.Search,
          hasMoreMovies: json.Response,
        })
      }
    })
    .catch(e => {
      this.props.results(e);
    })
  }

  // Update component if page asked for is greater than last page received
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.page > this.state.lastPage
  }

  render() {
    if (this.props.page > 1 && this.props.page > this.state.lastPage) {
      this.search();
    }
    return (
      <div className='pa3' >
        <input
        className='ma2 pa3 ba b--green bg-washed-blue br3'
        type='text'
        placeholder='Movie Name'
        onChange={event => this.onSearchChange(event)}
        onKeyPress={event => {if (event.key === 'Enter') this.search()}}
        />
        <button
        className='pa3 grow br3 bg-blue white'
        onClick={() => this.search()}
        >Submit</button>
      </div>
    )
  }
}

export default Search;