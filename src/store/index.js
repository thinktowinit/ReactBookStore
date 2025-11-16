import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import bookSlice from './book-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    books: bookSlice.reducer,
  },
});

export default store;
