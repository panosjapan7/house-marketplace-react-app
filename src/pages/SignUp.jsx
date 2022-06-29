import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
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

      const formDataCopy = { ...formData }; // We create a copy of formData (which contains name, email, password)

      delete formDataCopy.password; // We don't want the password to be stored in the database so we delete it from formDataCopy

      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy); // Updates our database and adds the user to the "users" collection
      
      navigate("/"); // We redirect to the home page
    } 
    catch (error) {
      toast.error("Something went wrong with registration");
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

        <OAuth />
        
        <Link to="/sign-in" className="registerLink">Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp