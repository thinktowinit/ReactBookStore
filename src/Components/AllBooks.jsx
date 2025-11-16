import { useEffect, useState } from "react"
import Books from "./Books"
import { createBook, deleteBook, fetchBooks, updateBook } from "./HttpRequest"
import Modal from "./Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import CreateNewBook from "./CreateNewBook";
import { HTTP_REQUEST_API_TYPE } from "./Constants";
import { getBooks, create, removeBook, getBookById, update } from "./HttpRequestAxios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData, updateExistingBook, deleteBookById, createNewBook2 } from '../store/book-actions';
import Notification from './Notification';


function AllBooks() {
   console.log("dataaa===");
const notification = useSelector((state) => state.ui.notification);


//read books info from store
  const listOfBooks2 = useSelector((state) => state.books.items);
const dispatch = useDispatch();

  const [listOfBooks, setListOfBooks] = useState([]);

  const [bookToDelete, setBookToDelete] = useState(null);
  const [isClickCreateNewBookButton, setIsClickCreateNewBookButton] = useState(false);
  const [editBook, setEditBook] = useState(null);

  // useEffect(() => {
  //   getAllBooks();
  // }, []);  //this is with out redux thunk

//below is without redux thunk
  async function getAllBooks() {
    alert("getAllBooks"+HTTP_REQUEST_API_TYPE);
    try {
      var data = undefined;
      console.log(HTTP_REQUEST_API_TYPE);
      if (HTTP_REQUEST_API_TYPE === "axios") {
        data = await getBooks();
      } else if (HTTP_REQUEST_API_TYPE === "fetch") {
        data = await fetchBooks();
      }
      console.log("dataaa===" + data);
      setListOfBooks(data);
    } catch (error) {
      console.log("error while getAllBooks" + error);
    }
  }

  //below is with redux thunk
 useEffect(() => {
  alert("===");
  dispatch(fetchBookData()); //with redux thunk
}, [dispatch]); // [], Elint



  async function handleConfirmDelete() {
    if (!bookToDelete) return;

    try {
      if (HTTP_REQUEST_API_TYPE === "axios") {
        await removeBook(bookToDelete.id);
      } else if (HTTP_REQUEST_API_TYPE === "fetch") {
        await deleteBook(bookToDelete.id);
      }

      setBookToDelete(null);
      getAllBooks();
    } catch (err) {
      alert("Failed to delete book: " + err.message);
    }
  }

  async function handleConfirmDelete2() {
  if (!bookToDelete) return;
  await dispatch(deleteBookById(bookToDelete.id));
  setBookToDelete(null);
}


  function handleCancelDelete() {
    setBookToDelete(null);
  }

  function createNewBook(event) {
    event.preventDefault();
    setIsClickCreateNewBookButton(true); //form will show and hide the button
    setEditBook(null);
  }

  function cancelBook(event) {
    event.preventDefault();
    setIsClickCreateNewBookButton(false);
    setEditBook(null);
  }

  function handleDeleteRequest(book) {//this book object comoing from child comp
    setBookToDelete(book); // Show confirmation
  }

  async function saveCreateBook2(bookData) {
  if (editBook) {
    await dispatch(updateExistingBook(editBook.id, bookData));
  } else {
    await dispatch(createNewBook2(bookData));
  }
  setIsClickCreateNewBookButton(false);
  setEditBook(null);
}


  async function saveCreateBook(bookData) {
    try {
      if (editBook) {
        if (HTTP_REQUEST_API_TYPE === "axios") {
          await update(bookData, editBook.id);
        } else if (HTTP_REQUEST_API_TYPE === "fetch") {
          await updateBook(editBook.id, bookData);
        }
      } else {
        if (HTTP_REQUEST_API_TYPE === "axios") {
          await create(bookData);
        } else if (HTTP_REQUEST_API_TYPE === "fetch") {
          await createBook(bookData);
        }
      }
      setIsClickCreateNewBookButton(false);
      setEditBook(null);
      getAllBooks();
    } catch (error) {
      alert('Error saving book: ' + error.message);
    }
  }

  function handleEditRequest(book) {//this book object comoing from child comp
    setEditBook(book); // Show confirmation
    setIsClickCreateNewBookButton(true);
  }

  return (
    <>
      <div>

 {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

        <h1>All books</h1>
        {!isClickCreateNewBookButton && (
          <button style={{ backgroundColor: 'blue' }} onClick={createNewBook}>
            Create New Book
          </button>
        )}

        {isClickCreateNewBookButton &&
          <CreateNewBook initialData={editBook} onSubmit={saveCreateBook2} onCancel={cancelBook} />}


        <Modal open={!!bookToDelete} onClose={handleCancelDelete}>
          {bookToDelete && (
            <DeleteConfirmation
              onConfirm={handleConfirmDelete2}
              onCancel={handleCancelDelete}
            />
          )}
        </Modal>


        <Books listOfBooks={listOfBooks2} onDelete={handleDeleteRequest} onEdit={handleEditRequest} />
      </div>
    </>
  )
}

export default AllBooks

