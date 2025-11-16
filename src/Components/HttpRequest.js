// src/httprequest.js
import { BASE_URL } from './Constants';

export async function fetchBooks() {
   alert("fetchBooks");
   console.log("BASE_URL==");
   console.log(BASE_URL);
   alert("BASE_URL==");
   alert(BASE_URL);
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const resData = await response.json();
  console.log("==============");
  console.log(resData);
  console.log("==============");

  return resData;
}

export async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }

  return await response.text();
}

export async function updateBook(id, bookData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  return await response.json();
}

export async function createBook(bookData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  return await response.json();
}
