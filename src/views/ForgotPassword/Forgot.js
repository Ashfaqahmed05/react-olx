import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function Forgot() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");

  const handleforgot = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Request Submitted! please check your 'Email'");
      navigate('/')
    } catch (error) {
      alert(error.message)
      console.error("Error signing up:", error.message);
    }
  };


  return (
    <>
      <div>
        <div className="signup-container">
          <h2>Forgot Password</h2>
          <form  onSubmit={handleforgot}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit">Reset Password</button>
          </form>

          <p>
            <a style={{cursor: 'pointer'}} onClick={()=> navigate('/')}>Back</a>
          </p>
        </div>
      </div>
   
    </>
  );
}

export default Forgot;