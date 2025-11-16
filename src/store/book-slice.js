// store/book-slice.js
import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',  //key state name, this is in store
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    setBooks(state, action) { //this is adding all list books to store
      state.items = action.payload; //25
    },
    addBook(state, action) {
      state.items.push(action.payload);
      state.changed = true;
    },
    updateBook(state, action) {
      const index = state.items.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.changed = true;
      }
    },
    deleteBook(state, action) { //here getting id from action, not object
      state.items = state.items.filter((book) => book.id !== action.payload);
      state.changed = true;
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice;
