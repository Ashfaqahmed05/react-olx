import  {useState, useEffect} from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import ProductPage from "../views/Main/Product";
import Productdetail from "../views/ProductDeatail/ProductDetail";
import Signup from "../views/Signup/Signup";
import Signin from "../views/Signin/Signin";
import Cart from "../views/CartPage/Cart";
import Post from "../views/Post/Post"
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Profile } from "../views/Profile/Profile";
import Forgot from "../views/ForgotPassword/Forgot";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/DB";


import ErrorBoundary from "./Error";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Signin />,
        },
        {
          path: "/forgot-password",
          element: <Forgot />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/product",
          element: <ProductPage />,

        },
        {
          path: "/cartItems",
          element: <Cart />,

        },
        {
          path: '/post',
          element: <Post />
        },
        {
          path: "/productdetail/:id",
          element: <Productdetail />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      
      ]
    },
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
  
            if (user) {
              navigate("/product");
              return;
            } else {
              navigate("/");
              return;
            }
          });
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      };
  
      checkAuthentication();
    }, [user]);
  


    if (loading) return <div>Loading...</div>

    return <div className="main" style={{height: 100}}>
        <Header/>
        {user?<>

        <Navbar user={user} />
        </>: 
       <></>
        }
        <Outlet />
        <Footer/>
    </div>
}

function Router() {
    return <ErrorBoundary> <RouterProvider router={router} /></ErrorBoundary>
}

export default Router;