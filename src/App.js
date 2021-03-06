import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import Footer from './Footer'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    books : [], //current books on shelves
    searchBooks : [], //search book result
    query: '', //search book query
    loading: false, //determine loading or not
    searching: false //determine searching or not
  }

  //to show loading screen
  startLoading(){
      this.setState({loading:true});
  }

  //to hide loading screen
  stopLoading(){
      this.setState({loading:false})
  }

  //to show searching progress in the search bar
  startSearching(){
      this.setState({searching:true});
  }

  //to hide searching progress in the search bar
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
    this.setState({ query : query.trim()})
    BooksAPI.search(query,20).then((searchBooks)=>{
      let books = this.state.books;

      //compare books, if books are on shelves, assign the correct shelf to the search result
      if(searchBooks && searchBooks.length>0){
        searchBooks.forEach( function (book) {
          let index = books.findIndex(b => b.id === book.id);

          //if found
          if(index >= 0) {
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

        //if found
        if(index>=0){
          updatedBooks[index] = book;
        }
      }

      if(books && books.length>0){
        let index = this.state.books.findIndex(b => b.id === book.id)

        //if found
        if(index>=0){
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

  render() {
    return (
      <div className="app">
        <Route exact path = "/" render = {() => (
          <ListBooks
            books = {this.state.books}
            loading = {this.state.loading}
            onUpdateBook = {this.updateBook}
          />
        )}
        />
        <Route path = "/search" render = {() => (
          <SearchBooks
            books = {this.state.searchBooks}
            onSearchBook = {this.searchBook}
            onUpdateBook = {this.updateBook}
            searching = {this.state.searching}
            query = {this.state.query}
          />
        )}
        />
        <Footer/>
      </div>
    )
  }
}

export default BooksApp
