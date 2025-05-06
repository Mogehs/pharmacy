import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPForm from "./components/VerifyOtp";
import VerifyUser from "./components/VerifyUser";
import UpdatePassword from "./components/UpdatePassword";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./components/blogs/BlogDetail";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./components/PageNotFound";
import ForgotPassword from "./components/ForgotPassword";
import CartPage from "./components/shop/CartPage";
import Consultations from "./pages/Consultations";
import CourseSells from "./pages/CourseSells";
import CourseDetail from "./components/coursesell/course-detail/CourseDetail";

import AdminLayout from "./components/Dashboard/admin/AdminLayout";
import Products from "./components/Dashboard/Products";
import Customers from "./components/Dashboard/Customers";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./components/Dashboard/Orders";
import ProductDetail from "./components/shop/ProductDetail";
import Courses from "./components/Dashboard/Courses";
import Students from "./components/Dashboard/Students";

import ScrollToTop from "./utils/ScrollToTop";
import Admission from "./pages/Admission";
import { ToastContainer } from "react-toastify";

const MainLayout = () => (
  <div className="lg:mx-auto lg:max-w-[1536px]">
    <ToastContainer></ToastContainer>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
      { path: "/products", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/appointments", element: <Consultations /> },
      { path: "/courses", element: <CourseSells /> },
      { path: "/courses/:id", element: <CourseDetail /> },
      { path: "/admissions", element: <Admission /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },
  { path: "/verify-otp", element: <OTPForm /> },
  { path: "/user-verification/:id", element: <VerifyUser /> },
  { path: "/update-password", element: <UpdatePassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  // Admin Routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/dashboard/products", element: <Products /> },
      { path: "/dashboard/customers", element: <Customers /> },
      { path: "/dashboard/orders", element: <Orders /> },
      { path: "/dashboard/courses", element: <Courses /> },
      { path: "/dashboard/students", element: <Students /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
