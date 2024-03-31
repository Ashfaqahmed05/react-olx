import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Config/firebase/DB";
import { doc, getDocs, db, collection, query, where } from "../../Config/firebase/DB";

import "./style.css";

function Navbar({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);




  useEffect(() => {
    if (user) {
      fetchingUserData();
    }
  }, [user]);

  const fetchingUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <img className="logo" src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol-700x394.png" alt="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <form
              className="location-form d-flex"
              role="search"
            >
              <div className="icon1">
                <box-icon name='search'></box-icon>
              </div>
              <input

                className="search form-control me-2"
                type="search"
                placeholder="Pakistan"
                aria-label="Search"

              />
            </form>
            <form className="search-form d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Cars,mobiles,etc.." aria-label="Search" />
              <div className="icon">
                <box-icon name='search'></box-icon>
              </div>
            </form>

            <div className="user d-flex">
              <img
                className="profile-pic"
                src={userData && userData.profile_pic ? userData.profile_pic : "https://e7.pngegg.com/pngimages/981/645/png-clipart-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-thumbnail.png"}
                alt="Profile Picture"
                onClick={() => navigate(`/profile/${user.uid}`)}
              />


              <div className="cartItems"
                onClick={() => { navigate('/cartItems') }}>
                <box-icon type='solid' name='cart'></box-icon>
              </div>
              <button className="sellbtn"
                onClick={() => { navigate('/post') }}>
                sell
              </button>
              <button className="logoutbtn"
                onClick={() => { logout(); navigate('/') }}>
                logout
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
