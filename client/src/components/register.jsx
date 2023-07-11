import React, { useEffect, useState } from "react";
import google_Logo from "./google_logo.png";
import {app} from "../config/firebase_config";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import '../styling/login.css';
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { validateUser } from "../api";

const Register = ({setAuth, onFormSwitch}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    const [{user}, dispatch] = useStateValue();    

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
  
    const navigate = useNavigate();
  
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if(userCred){
                setAuth(true);
                window.localStorage.setItem("auth","true");

                firebaseAuth.onAuthStateChanged((userCred) =>{
                    if(userCred){
                        userCred.getIdToken().then((token) => {
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user:data,
                                })
                            })
                          });
                          navigate("/",{replace : true});
                    }else{
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user:null,
                        })
                        navigate("/login");
                    }
                });
            }
        });
    };

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true")
            navigate("/",{replace : true});
    }, []);

    return (
        <div className="Container">
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input className="login-input" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input className="login-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
            <button className="google-button" onClick={loginWithGoogle}>
              <img src={google_Logo} alt="Google Logo" className="google-logo" />
              Sign in with Google
            </button>
        </form>
        <button className="link-btn" onClick={() => onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
        </div>

    )
}

export default Register;