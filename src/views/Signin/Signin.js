import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinFirebase } from "../../Config/firebase/DB";
import toast from "react-hot-toast";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userinfo = { email, password };
      await signinFirebase(email,password);
      toast.success("Sign in successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="signup-container">
          <h2>Sign in an Account</h2>
          <form onSubmit={handleSignin}>
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

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Sign In</button>
          </form>

          <p>
            Create a new account? <a style={{cursor: 'pointer'}} onClick={()=> navigate('/signup')}>Sign up</a>
          </p>
          <p style={{cursor: 'pointer'}}
          onClick={()=>{navigate('/forgot-password')}}
          >forgot password?</p>
        </div>
      </div>
   
    </>
  );
}

export default Signin;