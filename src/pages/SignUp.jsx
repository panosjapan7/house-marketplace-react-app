import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(); // We get the auth value from getAuth() function
      
      // We register the user with the createUserWithEmailAndPassword function that returns a promise which we save into userCredential variable
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user; // We get the actual user info from userCredential.user & save it to user variable
      
      updateProfile(auth.currentUser, {displayName: name}); // We update the displayName
      
      navigate("/"); // We redirect to the home page
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>

          <input type="text" className="nameInput" placeholder="Name" id="name" value={name} onChange={onChange}/>

          <input 
            type="email" 
            className="emailInput" 
            placeholder="Email" 
            id="email" 
            value={email} 
            onChange={onChange} 
          />

          <div className="passwordInputDiv">
            <input 
              type={showPassword ? "text" : "password"} 
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img 
              src={visibilityIcon} 
              alt="show password" 
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">Forgot Password</Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
            </button>
          </div>

        </form>

        <Link to="/sign-in" className="registerLink">Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp