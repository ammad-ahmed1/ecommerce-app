import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import {
  Home,
  Contact,
  OrderHistory,
  Login,
  Register,
  Reset,
  Admin,
  AdminDashboard,
  AddProductForm,
  ViewProducts,
  Cart,
} from "./pages";
import { Header, Footer } from "./components/index";
import ShowOnLogin from "./components/hidden-link/HiddenLink";
import { useSelector } from "react-redux";
import AdminOnlyRoutes from "./components/admin-only/routes/AdminOnlyRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useEffect, useState } from "react";
import Sidebar from "./components/admin-only/sidebar/Sidebar";
import Orders from "./pages/admin/orders/Orders";
import ProductDetail from "./pages/product-detail/ProductDetail";
import ClientSidebar from "./components/shared/sidebar/ClientSidebar";
import AddressForm from "./pages/checkout/address-form/AddressForm";
import Checkout from "./pages/checkout/checkout/Checkout";

// import AddProductForm from "./pages/admin/products/add-products/AddProductForm";
function AdminLayout({ children }) {
  // You can customize the sidebar here
  const sidebar = <Sidebar />;

  return (
    <div style={{ display: "flex" }}>
      {sidebar}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Content on the right side */}
        {children}
      </div>
    </div>
  );
}
function UserLayout({ children }) {
  // You can customize the sidebar here
  const clientSidebar = <ClientSidebar />;

  return (
    <div style={{ display: "flex" }}>
      {/* {clientSidebar} */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Content on the right side */}
        {children}
      </div>
    </div>
  );
}
function App() {
  const [isShowHeaderAndFooter, setIsShowHeaderAndFooter] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const loc = window.location.pathname;
    if (
      location?.pathname === "/login" ||
      location?.pathname === "/login/cart" ||
      location?.pathname === "/register" ||
      location?.pathname === "/reset-password"
    ) {
      setIsShowHeaderAndFooter(false);
    } else {
      setIsShowHeaderAndFooter(true);
    }
  }, [location?.pathname]);
  return (
    <div style={{ margin: "20px" }}>
      <ToastContainer />
      {isShowHeaderAndFooter && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login/cart" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route
          path="/view-products"
          element={
            <UserLayout>
              <ViewProducts />
            </UserLayout>
          }
        />
        <Route
          path="cart"
          element={
            <UserLayout>
              <Cart />
            </UserLayout>
          }
        />
        <Route
          path="address-form"
          element={
            <UserLayout>
              <AddressForm />
            </UserLayout>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <UserLayout>
              <ProductDetail />
            </UserLayout>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoutes>
              <Admin />
            </AdminOnlyRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes>
              <AdminOnlyRoutes>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminOnlyRoutes>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoutes>
              <AdminOnlyRoutes>
                <AdminLayout>
                  <AddProductForm />
                </AdminLayout>
              </AdminOnlyRoutes>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedRoutes>
              <AdminOnlyRoutes>
                <AdminLayout>
                  <AddProductForm />
                </AdminLayout>
              </AdminOnlyRoutes>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/view-products"
          element={
            <ProtectedRoutes>
              <AdminOnlyRoutes>
                <AdminLayout>
                  <ViewProducts />
                </AdminLayout>
              </AdminOnlyRoutes>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoutes>
              <AdminOnlyRoutes>
                <AdminLayout>
                  <Orders />
                </AdminLayout>
              </AdminOnlyRoutes>
            </ProtectedRoutes>
          }
        />
      </Routes>
      {isShowHeaderAndFooter && <Footer />}
    </div>
  );
}

export default App;
