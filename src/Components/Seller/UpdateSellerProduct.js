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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const productId = localStorage.getItem('updateProductId');
    // setProductDetails({ productName: '', price: '', stockQuantity: '', category: '', subCategory: '' });

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'my-preset'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'digcjdyd3');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/digcjdyd3/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload Progress:', percentCompleted);
            // Update UI with the upload progress if needed
          },
        }
      );
      showToast('Product Updated', 'success');
      const cloudinaryUrl = response.data.secure_url;

      await axios.put(
        `${apiUrl}/api/seller/update-product`,
        {
          ...productDetails,
          imageUrl: cloudinaryUrl,
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
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
            <h1>Edit Product</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-1' >Product Name</label>
              <input type='text' onChange={onChange} name='productName' value={productDetails.productName} className='form-control input-field fs-4' placeholder='Enter new product name' />
              <label className=' fs-4 mt-1' >Categories</label>
              <select onChange={onChange} name='category' value={productDetails.category} className="form-select mt-2" aria-label="Default select example">
                <option selected>Select New Category</option>
                <option name='Mens' value="Mens">Men's</option>
                <option name='Womens' value="Womens">Women's</option>
                <option name='kids' value="Kids">Kid's</option>
              </select>
              <select onChange={onChange} name='subCategory' value={productDetails.subCategory} className="form-select" aria-label="Default select example">
                <option selected>Select New Sub-Category</option>
                <option value="gentsShirt">Gent's Shirt</option>
                <option value="gentsPant">Gent's Pant</option>
                <option value="gentsHoody">Gent's Hoody</option>
                <option value="girlsTop">Girl's Top</option>
                <option value="LadiesPant">Ladies Pant</option>
                <option value="LadiesDress">Ladies Dress</option>
                <option value="KidsWear">Kids Wear</option>
              </select>
              <label className=' fs-4 mt-1' >Price</label>
              <input type='number' onChange={onChange} name='price' value={productDetails.price} className='form-control input-field fs-4' placeholder='Enter new price' />
              <label className=' fs-4 mt-1 ' >Update Stock Quantity</label>
              <input type='number' onChange={onChange} name='stockQuantity' value={productDetails.stockQuantity} className='form-control input-field fs-4' placeholder='Enter new quantity' />
              <label className='fs-6 mt-4 text-primary bold' >Upload New Product Image</label> &nbsp;
              <input type="file" onChange={onInputChange} />
              <button onClick={handleUpdateProduct} className='btn btn-warning form-control mt-4 fs-4 bold '>Update Product</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
