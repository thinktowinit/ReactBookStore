import './books.css';

function Books({ listOfBooks, onDelete, onEdit }) {
console.log("from books comp===========");
    console.log(listOfBooks);
  return (
    <div>
      <h1>Books</h1>
      <table border="1" cellPadding="8" cellSpacing="0" className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfBooks && listOfBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.publication}</td>
              <td>{book.category}</td>
              <td>{book.pages}</td>
              <td>{book.price}</td>
              <td>
<button className='btbgcolor' onClick={() => onEdit(book)}>Edit</button>&nbsp;&nbsp;
<button className='btbgcolordelete' onClick={() => onDelete(book)}>Delete</button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
