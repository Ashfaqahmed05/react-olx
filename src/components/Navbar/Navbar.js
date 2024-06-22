  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { collection, db, getDocs, logout, query, where } from "../../Config/firebase/DB";
  import { useDispatch } from "react-redux";
  import { setSearchTerm } from "../../Config/Store/searchSlice";
  import "./navbar.css";
  function Navbar({ user }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [hasNewOrders, setHasNewOrders] = useState(false); 


    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
      const searchTerm = e.target.value;
      dispatch(setSearchTerm(searchTerm));
    };




    useEffect(() => {
      if (user) {
        fetchingUserData();
        fetchNewOrders();
      }
    }, [user]);

    useEffect(() => {
      // Check for new orders on user change or periodically
      const interval = setInterval(fetchNewOrders, 60000); // Fetch every minute (adjust as needed)
      return () => clearInterval(interval); // Cleanup interval
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Update when user changes
  


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

    const fetchNewOrders = async () => {
      try {
        // Example logic to determine if there are new orders (change as per your app logic)
        const q1 = query(collection(db, 'orders'), where('Customer_ID', '==', user.uid));
        const q2 = query(collection(db, 'orders'), where('owner_ID', '==', user.uid));
        
        const [sentSnapshot, receivedSnapshot] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);
  
        const hasNewSentOrders = !sentSnapshot.empty;
        const hasNewReceivedOrders = !receivedSnapshot.empty;
  
        setHasNewOrders(hasNewSentOrders || hasNewReceivedOrders);
      } catch (error) {
        console.error('Error fetching new orders:', error);
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

              <form className="search-form d-flex">
                <input className="search me-2" type="text" placeholder="Cars,mobiles,etc.." onChange={handleSearchChange} />
                <div className="icon2">
                  <box-icon type="submit" name='search'></box-icon>
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
               
              <div className="cartItems" onClick={() => navigate('/orders')}>
                <box-icon name='notepad'>
                  {hasNewOrders && <span className="red-dot"></span>} {/* Conditional red dot */}
                </box-icon>
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
