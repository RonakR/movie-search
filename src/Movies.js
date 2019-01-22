import React, { Component } from 'react';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    
    // Detects end of current page and fetches more results if there are any
    window.onscroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && props.hasMoreMovies) {
        props.moreResults();
      }
    };
  }

  // Maps over the movies array sent from parent component
  // Grabs placeholder poster if one isn't speicified 
  moviesMap(movies) {
    const moviesDOM = movies.map((movie, i) => {
      // img styles in js because this helps the DOM better predict layout during render
      const poster = movie.Poster === 'N/A' ? `http://placehold.jp/200x200.png?text=${encodeURIComponent(movie.Title)}` : movie.Poster;
      const style = {
        background: `url(${poster}) no-repeat center center / cover`,
      }
      return (
        <a key={i} href={`https://www.imdb.com/title/${movie.imdbID}`} className="fl w-50 w-25-l link overflow-hidden">
          <div role="img" className="grow aspect-ratio--4x6" style={style}></div>
        </a>
      )
    });
    return moviesDOM;
  }
  
  // Component should update while there are more movies to be fetched
  shouldComponentUpdate(nextProps){
    return nextProps.hasMoreMovies
  }

  render() {
    return (
      <div>
        <div>{this.props.movies ? this.moviesMap(this.props.movies) : 'Sorry, no movies found matching the query.'}</div>
      </div>
    )
  }
}

export default Movies;