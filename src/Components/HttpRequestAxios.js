// src/httprequestAxios.js
import axios from 'axios';
import { BASE_URL } from './Constants';

// Create an axios instance with baseURL
const api = axios.create({
  baseURL: BASE_URL,
});

export async function create(book) {
  const resp = await api.post('', book);
  return resp.data;
}

export async function getBooks() {
    console.log("BASE_URL=="+BASE_URL);
  const resp = await api.get('');
  console.log(resp.status);
  console.log("===== getBooks using axios =====");
  console.log(resp.data);
  return resp.data;
}

export async function removeBook(id) {
  const resp = await api.delete(`/${id}`);
  console.log(resp.data);
  return resp.data;
}

export async function getBookById(id) {
  const resp = await api.get(`/${id}`);
  return resp.data;
}

export async function update(book, id) {
  try {
    const resp = await api.put(`/${id}`, book);
    return resp.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}
