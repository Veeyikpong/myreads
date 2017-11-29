import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Shelf from './Shelf'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {

  startLoading(){
      this.setState({loading:true});
  }

  stopLoading(){
      this.setState({loading:false})
  }

  startSearching(){
      this.setState({searching:true});
  }

  stopSearching(){
      this.setState({searching:false})
  }

  componentDidMount(){
    this.startLoading();
    BooksAPI.getAll().then((books)=>{
      this.stopLoading();
      this.setState({books})
    })
  }

  searchBook = (query) => {
    this.startSearching();
    BooksAPI.search(query,20).then((searchBooks)=>{
      let books = this.state.books;
      if(searchBooks && searchBooks.length>0){
        searchBooks.forEach( function (book) {
          let index = books.findIndex(b => b.id === book.id);
          if(index > 0) {
            book.shelf = books[index].shelf;
          }
        });
      }
      this.stopSearching();
      this.setState({searchBooks})
    })
  }

  updateBook = (book, shelf) => {
    this.startLoading();
    book.shelf = shelf;
    BooksAPI.update(book,shelf).then((searchBooks)=>{
      //update both the search result shelf and the shelves on the main page
      let updatedBooks = this.state.searchBooks;
      let books = this.state.books;

      if(updatedBooks && updatedBooks.length>0){
        let index = this.state.searchBooks.findIndex(b => b.id === book.id)
        if(index!==-1){
          updatedBooks[index] = book;
        }
      }

      if(books && books.length>0){
        let index = this.state.books.findIndex(b => b.id === book.id)
        if(index!==-1){
          books[index] = book;
        }else{
          books.push(book)
        }
      }

      this.stopLoading();
      this.setState({updatedBooks})
      this.setState({books})
    })
  }

  state = {
    books : [],
    searchBooks : [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    loading: false,
    searching: false,
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route exact path = "/" render = {() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.state.loading && (<div className="loading"/>)}
            <Shelf
              title="Currently Reading"
              books={this.state.books.filter((book)=>book.shelf==="currentlyReading")}
              onUpdateBook={this.updateBook}
              loading = {this.state.loading}/>
            <Shelf
              title="Want to Read"
              books={this.state.books.filter((book)=>book.shelf==="wantToRead")}
              onUpdateBook={this.updateBook}
              loading = {this.state.loading}/>
            <Shelf
              title="Read"
              books={this.state.books.filter((book)=>book.shelf==="read")}
              onUpdateBook={this.updateBook}
              />
            <div className="open-search">
            <Link to="/search" className = "open-search">Add Contact</Link>
            </div>
            <footer className="footer">
              <small>&copy; Developed by Pong Vee Yik @ Udacity React Programme</small>
            </footer>
          </div>
        )}
        />
        <Route path = "/search" render = {() => (
          <SearchBooks
            books = {this.state.searchBooks}
            onSearchBook = {this.searchBook}
            onUpdateBook = {this.updateBook}
            searching = {this.state.searching}
          />
        )}
        />
        </div>
    )
  }
}

export default BooksApp
