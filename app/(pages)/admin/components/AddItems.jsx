import React, { useState } from 'react'
import { addProduct } from '../../../../api/productService';
import { useDispatch } from 'react-redux';

const AddItems = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    stock: '',
    images: null,
    description: '',
  })

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form Data for file uploads
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('price', formData.price);
    payload.append('category', formData.category);
    payload.append('stock', formData.stock);
    payload.append('description', formData.description);
    if (formData.images) {
      Array.from(formData.images).forEach((file) => payload.append('images', file));
    }

    // Dispatch Redux action
    dispatch(addProduct(payload));

  }

  return (
    <div>
      <h1 className='text-2xl text-center font-medium '>Add Item</h1>
      <div className=''><Input type="text" placeholder="Title" value={formData.title}
        onChange={handleChange} name="title" /></div>
      <div><Input type="number" placeholder="Price" value={formData.price}
        onChange={handleChange} name="price" /></div>
      <div><Input type="text" placeholder="category" value={formData.category} onChange={handleChange} name="category" /></div>
      <div > <Input type="number" placeholder="stock" value={formData.stock} onChange={handleChange} name="stock" /></div>
      <div>
        <Input type="file" multiple="multiple" placeholder="Images"
          onChange={handleChange} name="images" /></div>

      <div><textarea type="text" rows={4} placeholder="Description" value={formData.description}
        onChange={handleChange} name="description"
        className="w-full text-sm mt-4  text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-[#FF7518]" />
      </div>

      <button onClick={handleRegister} className='px-4 py-2 border-2 bg-orange-500 mt-4 rounded-lg text-white'>
      Add Item
      </button>
    </div>
  )
}

export default AddItems;

const Input = (props) => {
  return (
    <input
      name={props.name}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required
      multiple={props.multiple}
      className="w-full text-sm mt-4 text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-[#FF7518]" />
  )
}

