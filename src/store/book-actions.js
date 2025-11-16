// store/book-actions.js
import { bookActions } from './book-slice';
import { uiActions } from './ui-slice';
import { fetchBooks, deleteBook, createBook, updateBook } from '../Components/HttpRequest';

export const fetchBookData = () => {
  alert("fetchBookData");
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Loading...',
      message: 'Fetching book data...',
    }));

    try {
      const data = await fetchBooks(); //20
      dispatch(bookActions.setBooks(data));  //this will add 20 books to state, this state is in store
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Books loaded successfully.',
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed to fetch books.',
      }));
    }
  };
};

export const createNewBook2 = (bookData) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Creating...',
      message: 'Creating new book...',
    }));

    try {
      const createdBook = await createBook(bookData);
      dispatch(bookActions.addBook(createdBook));
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Book created successfully.',
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed to create book.',
      }));
    }
  };
};

export const updateExistingBook = (id, bookData) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Updating...',
      message: 'Updating book...',
    }));

    try {
      const updated = await updateBook(id, bookData); //send request to BE java to update
      dispatch(bookActions.updateBook(updated)); //store updated
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Updated!',
        message: 'Book updated successfully.',
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed to update book.',
      }));
    }
  };
};

export const deleteBookById = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Deleting...',
      message: 'Deleting book...',
    }));

    try {
      await deleteBook(id);
      dispatch(bookActions.deleteBook(id));
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Deleted!',
        message: 'Book deleted successfully.',
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed to delete book.',
      }));
    }
  };
};
