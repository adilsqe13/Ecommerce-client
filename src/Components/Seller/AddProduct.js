import React, { useState, useContext } from 'react';
import axios from 'axios';
import toastContext from '../../CONTEXT/Context/toastContext';
import Spinner from '../Spinner';

export default function AddProduct() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(toastContext);
  const { showToast } = context;
  const token = localStorage.getItem('sellerToken');
  const [productDetails, setProductDetails] = useState({
    productName: '',
    price: '',
    stockQuantity: '',
    category: '',
    subCategory: '',
  });
  const [image, setImage] = useState('');
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');

  const handleAddProduct = async (e) => {
    setCloudinaryUrl('processing');
    e.preventDefault();

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
      setCloudinaryUrl(response.data.secure_url);
      // const cloudinaryUrl = 'image'; 
      await axios.post(
        `${apiUrl}/api/seller/add-product`,
        {
          ...productDetails,
          imageUrl: cloudinaryUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        }
      );

      setProductDetails({
        productName: '',
        price: '',
        stockQuantity: '',
        category: '',
        subCategory: '',
      });
      setImage(null);
      showToast('Product Added', 'success');
    } catch (error) {
      console.error('Error uploading product:', error);
      showToast('Error uploading product', 'error');
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container margin-top-md">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Add Product</h1>
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
              <input type="file" onChange={onInputChange} />
              <button disabled={productDetails.productName === '' ||
                productDetails.price === '' ||
                productDetails.stockQuantity === '' ||
                productDetails.category === '' ||
                productDetails.subCategory === '' ||
                image === null
              } onClick={handleAddProduct} className='btn btn-warning form-control mt-4 fs-4 bold '>
                { cloudinaryUrl === 'processing' ? <Spinner height='30' width='30' /> : 'Submit'}
                </button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
