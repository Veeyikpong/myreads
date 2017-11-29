import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListBooks extends Component{
  static propTypes={
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    onSearchBook: PropTypes.func.isRequired
  }

  state={
    query:''
  }

  updateQuery = (query) => {
    this.setState({ query : query.trim()})
  }

  openLink(){
      window.open('http://google.com');
  }

  render(){
    const {books, onUpdateBook, onSearchBook, searching} = this.props;
    const {query} = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to ="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => {
                this.updateQuery(event.target.value)
                onSearchBook(event.target.value)}}
            />
          </div>
          {searching && <div className="searching"/>}
        </div>
        <div className="list-books-content">
          <div className="search-books-results">
            <ol className="books-grid">
            {books && books.length>0 && books.map((book) => (
              <li key = {book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks &&
                      <Link target="_blank" to ={book.previewLink}>
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      </Link>
                    }
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
            {(books == null || books.length==null) && (<p className="norecord"> No record found </p>)}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
