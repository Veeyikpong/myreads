import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'

class ListBooks extends Component{
  static propTypes={
      books: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
      onUpdateBook: PropTypes.func.isRequired
  }

  render(){
    const {books, loading, onUpdateBook} = this.props;
    return(
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {loading && (<div className="loading"/>)}
        <Shelf
          title="Currently Reading"
          books={books.filter((book)=>book.shelf==="currentlyReading")}
          onUpdateBook={onUpdateBook}/>
        <Shelf
          title="Want to Read"
          books={books.filter((book)=>book.shelf==="wantToRead")}
          onUpdateBook={onUpdateBook}/>
        <Shelf
          title="Read"
          books={books.filter((book)=>book.shelf==="read")}
          onUpdateBook={onUpdateBook}
          />
        <div className="open-search">
        <Link to="/search" className = "open-search">Add Contact</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
