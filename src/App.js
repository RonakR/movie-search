import React, { Component } from 'react';
import Movies from './Movies';
import Search from './Search';
import Title from './Title';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      page: 1,
      hasMoreMovies: true,
    }
  }

  // Callback fn that is passed to Search component
  // Called when results have been fetched 
  searchResults = (results) => {
    let newMovies = [];
    if (results.newSearch) {
      newMovies = results.movies;
      this.setState({ page: 1});
    } else {
      newMovies = results.movies ? this.state.movies.concat(results.movies) : this.state.movies;
    }
    this.setState({ movies: newMovies, hasMoreMovies: results.hasMoreMovies });
  }

  // Callbaked fn that is passed to Movies component
  // Called when window.onScroll detects end of page
  loadMoreResults = () => {
    this.setState({page: this.state.page + 1});
  }

  render() {
    return (
      <div className='tc'>
        <Title />
        <Search results={this.searchResults} page={this.state.page}/>
        {
          this.state.movies !== null ? <Movies movies={this.state.movies} moreResults={this.loadMoreResults} hasMoreMovies={this.state.hasMoreMovies}/> : <div></div>
        }
      </div>
    )
  }
}

export default App;