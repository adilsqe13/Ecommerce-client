import React, { useState, useContext } from 'react';
import axios from 'axios';
import toastContext from '../../CONTEXT/Context/toastContext';

export default function AddProduct() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(toastContext);
  const { showToast } = context;
  const token = localStorage.getItem('sellerToken');
  const [productDetails, setProductDetails] = useState({ productName: '', price: '', stockQuantity: '', category: '', subCategory: '' });
  const [image, setImage] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("productName", productDetails.productName);
    formData.append("category", productDetails.category);
    formData.append("subCategory", productDetails.subCategory);
    formData.append("price", productDetails.price);
    formData.append("stockQuantity", productDetails.stockQuantity);

    await axios.post(
      `${apiUrl}/api/seller/add-product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token
        },
      }
    );
    setProductDetails({ productName: '', price: '', stockQuantity: '', category: '', subCategory: '' });
    setImage(null);
    showToast('Product Added', 'success');
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  }
  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="container margin-top-md">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Add Product p</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-1' >Product Name</label>
              <input type='text' onChange={onChange} name='productName' value={productDetails.productName} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1' >Categories</label>
              <select onChange={onChange} name='category' value={productDetails.category} className="form-select mt-2" aria-label="Default select example">
                <option selected>Select Category</option>
                <option name='Mens' value="Mens">Men's</option>
                <option name='Womens' value="Womens">Women's</option>
                <option name='kids' value="Kids">Kid's</option>
              </select>
              <select onChange={onChange} name='subCategory' value={productDetails.subCategory} className="form-select" aria-label="Default select example">
                <option selected>Select Sub-Category</option>
                <option value="gentsShirt">Gent's Shirt</option>
                <option value="gentsPant">Gent's Pant</option>
                <option value="gentsHoody">Gent's Hoody</option>
                <option value="girlsTop">Girl's Top</option>
                <option value="LadiesPant">Ladies Pant</option>
                <option value="LadiesDress">Ladies Dress</option>
                <option value="KidsWear">Kids Wear</option>
              </select>
              <label className=' fs-4 mt-1' >Price</label>
              <input type='number' onChange={onChange} name='price' value={productDetails.price} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 ' >Stock Quantity</label>
              <input type='number' onChange={onChange} name='stockQuantity' value={productDetails.stockQuantity} className='form-control input-field fs-4' />
              <label className='fs-6 mt-4 text-primary bold' >Upload Product Image</label> &nbsp;
              <input type="file" accept='image/*' onChange={onInputChange} />
              <button disabled={productDetails.productName === '' ||
                productDetails.price === '' ||
                productDetails.stockQuantity === '' ||
                productDetails.category === '' ||
                productDetails.subCategory === '' ||
                image === null
              } onClick={handleAddProduct} className='btn btn-warning form-control mt-4 fs-4 bold '>Submit</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
