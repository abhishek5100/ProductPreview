import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/homepage/HomePage';
import Navbar from './components/navbar/Navbar';
import AdminDashboard from './components/admindashboard/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/productdetailspage/ProductDetails';

function App() {
  return (
   <>
      <ToastContainer />
   <Navbar/>
   <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/product-details/:id" element={<ProductDetails />}/>
      </Routes>
   </>
  );
}

export default App;
