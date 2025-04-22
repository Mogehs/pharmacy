import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPForm from "./components/VerifyOtp";
import VerifyUser from "./components/VerifyUser";
import UpdatePassword from './components/UpdatePassword';

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./components/blogs/BlogDetail";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from './components/PageNotFound';
import ForgotPassword from './components/ForgotPassword';


const MainLayout = () => (
  <div className="lg:mx-auto lg:max-w-[1536px]">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/blogs', element: <Blogs /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
      { path: '/shop', element: <Shop /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },
  { path: "/verify-otp", element: <OTPForm /> },
  { path: "/user-verification", element: <VerifyUser /> },
  { path: "/update-password", element: <UpdatePassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
