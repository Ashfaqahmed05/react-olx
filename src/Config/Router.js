import  {useState, useEffect} from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import ProductPage from "../views/Main/Product";
import Productdetail from "../views/ProductDeatail/ProductDetail";
import Signup from "../views/Signup/Signup";
import Signin from "../views/Signin/Signin";
import Post from "../views/Post/Post"
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Profile } from "../views/Profile/Profile";
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
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/product",
          element: <ProductPage />,

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
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        });
    }, [])

    // useEffect(() => {
    //     const path = window.location.pathname
    //     if (user) {
    //         if (path === '/register' || path === "/login") {
    //             navigate('/')
    //         }
    //     } else {
    //         if (path === '/' || path === '/post') {
    //             navigate('/login')
    //         }
    //     }
    // }, [window.location.pathname, user])

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