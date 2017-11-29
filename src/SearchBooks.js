import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListBooks extends Component{
  static propTypes={
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    onSearchBook: PropTypes.func.isRequired
  }

  render(){
    const {books, onUpdateBook, onSearchBook, searching} = this.props;

    if(books && books.length>0)
    {
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className='close-search' to ="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
              onChange={(event) => onSearchBook(event.target.value)}/>
            </div>
            {searching && <div className="searching"/>}
          </div>
          <div className="list-books-content">
            <div className="search-books-results">
              <ol className="books-grid">
              {books.map((book) => (
                <li key = {book.id}>
                  <div className="book">
                    <div className="book-top">
                        {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
                      <div className="book-shelf-changer">
                        <select value={book.shelf? book.shelf:'none'} onChange={(event) => onUpdateBook(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && book.authors.map((author) => (
                        <div key = {author} className="book-authors">{author}</div>
                    ))}
                  </div>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className='close-search' to ="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
              onChange={(event) => onSearchBook(event.target.value)}/>
            </div>
            {searching && <div className="searching"/>}
          </div>
          <div className="list-books-content">
            <div className="norecord">
              <p> No record found </p>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ListBooks
