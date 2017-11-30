import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Shelf extends Component{
  static propTypes={
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render(){
    const {title, books, onUpdateBook} = this.props;

    return(
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.map((book) => (
                  <li key = {book.id}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks &&
                          <Link target="_blank" to ={book.previewLink}>
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                          </Link>}
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
                {books.length<=0 && (<p className="no-record">Shelf is empty</p>)}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
