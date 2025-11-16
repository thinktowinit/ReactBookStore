import { useEffect, useState } from "react";


function CreateNewBook({initialData: editBook, onSubmit, onCancel}) {

useEffect(() => {
    //editBook have values when click edit button
    //editBook don't have values when create new button
    if (editBook) { 
      setFormData(editBook);
    }
  }, [editBook]);

const [formData, setFormData] = useState({
    name: '',
    author: '',
    publication: '',
    category: '',
    pages: '',
    price: '',
  });

    function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

//initialData is not empty for edit operation




function handleSubmit(event) {
    event.preventDefault();
    const updatedBook = {
      ...formData,
      pages: parseInt(formData.pages),
      price: parseInt(formData.price),
    };
    onSubmit(updatedBook);
  }


  return (
    <>
      <div>
    <form onSubmit={handleSubmit} className="new-book-form">
      <h2>{editBook ? 'Edit Book' : 'Create New Book'}</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
      <input name="publication" placeholder="Publication" value={formData.publication} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="pages" placeholder="Pages" type="number" value={formData.pages} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />

      <button type="submit">{editBook ? 'Update' : 'Save'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  

        </div>
    </>
  )
}

export default CreateNewBook
