import React from 'react';
import './App.css';
import Toast from './Components/Toast';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import MiniHeader from './Components/MiniHeader';
import Footer from './Components/Footer';
import AllProducts from './Components/ProductPages/AllProducts';
import MensAllProducts from './Components/ProductPages/MensAllProducts';
import WomensAllProducts from './Components/ProductPages/WomensAllProducts';
import KidsAllProducts from './Components/ProductPages/KidsAllProducts';
import MensShirts from './Components/ProductPages/MensShirts';
import MensPants from './Components/ProductPages/MensPants';
import MensHoodies from './Components/ProductPages/MensHoodies';
import WomensTops from './Components/ProductPages/WomensTops';
import WomensPants from './Components/ProductPages/WomensPants';
import WomensDresses from './Components/ProductPages/WomensDresses';
import CartPage from './Components/User/CartPage';
import AdminLogin from './Components/Admin/AdminLogin';
import Dashboard from './Components/Admin/Dashboard';
import SellerLogin from './Components/Seller/SellerLogin';
import SellerRegister from './Components/Seller/SellerRegister';
import SellerProfile from './Components/Seller/SellerProfile';
import AddProduct from './Components/Seller/AddProduct';
import AllSellerProducts from './Components/Seller/AllSellerProducts';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import ProductPage from './Components/ProductPages/ProductPage';
import MyOrders from './Components/User/MyOrders';
import ShippingAddress from './Components/User/ShippingAddress';
import Profile from './Components/User/Profile';
import Contacts from './Components/Contacts';
import OrderSuccess from './Components/User/OrderSuccess';
import OrderSuccessfull from './Components/User/OrderSuccessfull';
import PlaceOrder from './Components/User/PlaceOrder';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdateSellerProduct from './Components/Seller/UpdateSellerProduct';
import OrderList from './Components/Seller/OrderList';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <MiniHeader />
        <Toast />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/home-page' element={<HomePage />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/allProducts' element={<AllProducts />} />
          <Route exact path='/mens-allProducts' element={<MensAllProducts />} />
          <Route exact path='/womens-allProducts' element={<WomensAllProducts />} />
          <Route exact path='/kids-allProducts' element={<KidsAllProducts />} />
          <Route exact path='/mens-shirts' element={<MensShirts />} />
          <Route exact path='/mens-pants' element={<MensPants />} />
          <Route exact path='/mens-hoodies' element={<MensHoodies />} />
          <Route exact path='/womens-tops' element={<WomensTops />} />
          <Route exact path='/womens-pants' element={<WomensPants />} />
          <Route exact path='/womens-dresses' element={<WomensDresses />} />
          <Route exact path='/seller-login' element={<SellerLogin />} />
          <Route exact path='/cart-page' element={<CartPage />} />
          <Route exact path='/seller-register' element={<SellerRegister />} />
          <Route exact path='/seller-profile' element={<SellerProfile />} />
          <Route exact path='/seller-addProduct' element={<AddProduct />} />
          <Route exact path='/seller-allProducts' element={<AllSellerProducts />} />
          <Route exact path='/product-page' element={<ProductPage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/contacts' element={<Contacts />} />
          <Route exact path='/my-orders' element={<MyOrders />} />
          <Route exact path='/order-success' element={<OrderSuccess />} />
          <Route exact path='/order-successfull' element={<OrderSuccessfull />} />
          <Route exact path='/shipping-address' element={<ShippingAddress />} />
          <Route exact path='/place-order-page' element={<PlaceOrder />} />
          <Route exact path='/update-profile' element={<UpdateProfile />} />
          <Route exact path='/update-product' element={<UpdateSellerProduct />} />
          <Route exact path='/seller-orders' element={<OrderList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
