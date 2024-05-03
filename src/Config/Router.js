import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Cart from "../views/CartPage/Cart";
import Forgot from "../views/ForgotPassword/Forgot";
import ProductPage from "../views/Main/Product";
import { MyProducts } from "../views/MyProducts/MyProducts";
import Post from "../views/Post/Post";
import Productdetail from "../views/ProductDeatail/ProductDetail";
import { Profile } from "../views/Profile/Profile";
import Signin from "../views/Signin/Signin";
import Signup from "../views/Signup/Signup";
import { auth } from "./firebase/DB";


import BuyNow from "../views/BuyNow/BuyNow";
import Order from "../views/Order/Order";
import ErrorBoundary from "./Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Signin /> },
      { path: "/forgot-password", element: <Forgot /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/cartItems", element: <Cart /> },
      { path: '/post', element: <Post /> },
      { path: "/productdetail/:id", element: <Productdetail /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/myproducts/:id", element: <MyProducts /> },
      { path: "/buy/:id", element: <BuyNow /> },
      {path: "/orders", element: <Order />,}
    ]
  }
]);


function Layout() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);

          // if (user) {
          //   navigate("/product");
          //   return;
          // } else {
          //   navigate("/");
          //   return;
          // }
        });
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [user]);



  if (loading) return <div>Loading...</div>

  return <div className="main" style={{ height: 100 }}>
    <Header />
    {user ? <>

      <Navbar user={user} />
    </> :
      <></>
    }
    <Outlet />
    <Footer />
  </div>
}

function Router() {
  return <ErrorBoundary> <RouterProvider router={router} /></ErrorBoundary>
}

export default Router;