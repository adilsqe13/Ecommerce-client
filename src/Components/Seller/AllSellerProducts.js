import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import productContext from '../../CONTEXT/Context/productContext';
import Spinner from '../Spinner';

export default function AllSellerProducts() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('sellerToken');
  const navigate = useNavigate();
  const myProductcontext = useContext(productContext);
  const { productPage } = myProductcontext;
  const [allProducts, setAllProducts] = useState(null);
  const getAllProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/seller/get-products`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      const json = await response.json();
      setAllProducts(json.reverse());

    } catch (error) {
      console.error(error);
    }

  }

  const handleDelete = async (_id) => {
    const response = await fetch(`${apiUrl}/api/seller/delete-product`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ productId: _id })
    });
    const json = await response.json();
    if(json.success){
      window.location.reload();
    }
  }

  const handleProductPage = async (productId) => {
    await productPage(productId);
    navigate('/product-page');
    window.scrollTo(0, 0);
  }

  const handleEditProduct = (productId) => {
    localStorage.setItem('updateProductId', productId);
    navigate('/update-product');
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    <>
      <div className="container margin-top-md">
        <h1 className=''>All Uploaded Products</h1>
        <table className="table table-dark mt-4 border border-light">
          <thead>
            <tr>
              <th scope="col" className='screen-sm'>SL NO.</th>
              <th scope="col">Product Image</th>
              <th scope="col"> Product Name</th>
              <th scope="col" className='screen-sm'>Date Added</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col" className='screen-sm'>Edit</th>
              <th scope="col" className='screen-sm'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allProducts == null ? <Spinner height='70' width='70' /> : allProducts.map((item, index) => (
              <tr key={item._id}>
                <th scope="row" className='screen-sm'>{index + 1}</th>
                <td><img src={item.image} alt='img'
                  height={30}
                  width={30} /></td>
                <td><Link className='text-light ' to='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item._id); }}>
                  {item.productName}</Link></td>
                <td className='screen-sm'>{item.date.slice(0, 10)}</td>
                <td><span className='text-green-light dftcac'>Rs. {item.price} /-</span></td>
                <td>&nbsp;{item.stockQuantity}</td>
                <td className='screen-sm'> &nbsp;
                  <a onClick={() => { handleEditProduct(item._id) }} href='/update-product'><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ededed", }} /></a>
                </td>
                <td className='screen-sm'> &nbsp; &nbsp;
                  <a onClick={(e) => { e.preventDefault(); handleDelete(item._id) }} href="/" className="text-muted">
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#e50606", }} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
