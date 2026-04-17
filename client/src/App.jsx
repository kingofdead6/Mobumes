import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Shared/NavBar";
import Footer from "./Components/Shared/Footer";

import ProductsPage from "./Components/Products/Products";   // ← Updated import (change filename or import name)
import ProductDetailsPage from "./Components/Products/ProductDetails";

import CartPage from "./Components/Shared/Cart";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/Shared/ProtectedRoute";

import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminProducts from "./Components/Admin/AdminProducts";
import AdminCategories from "./Components/Admin/AdminCategories";
import AdminDeliveryAreas from "./Components/Admin/AdminDeliveryAreas"; // ← Fixed typo
import AdminUsers from "./Components/Admin/AdminUsers";
import AdminOrders from "./Components/Admin/AdminOrders";

import FinalizeOrder from "./Components/Products/FinalizeOrder";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/Shared/ScrollToTop";
import Aboutus from "./Pages/Aboutus";
import AdminGallery from "./Components/Admin/AdminGallery";
import ContactPage from "./Pages/Contact";
import AdminSellRequests from "./Components/Admin/AdminSellRequests";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />           
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<FinalizeOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell-us-something" element={<ContactPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/delivery-areas" element={<AdminDeliveryAreas />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/gallery" element={<AdminGallery />} /> 
          <Route path="/admin/sell-requests" element={<AdminSellRequests />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;