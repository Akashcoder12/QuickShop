import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import UserPanel from './pages/UserPanel';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className='flex-grow p-4'>
          <Routes>
           <Route path='/' element={<Home/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/register" element={<Register/>}></Route>
           <Route path="/products" element={<ProductListPage />} />
           <Route path="/products/:id" element={<ProductDetailPage />} />
           <Route path='/cart' element={<CartPage/>}></Route>
           <Route path='/orders' element={<OrderPage/>}></Route>
           <Route path='/user' element={<UserPanel/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
