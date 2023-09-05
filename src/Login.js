import NavBar from "./NavBar";
import { useState, useEffect, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import app from "./FirebaseConfig";

export default function Login() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/carquil");
        }
    }, []);

    const rUn = useRef();
    const rPw = useRef();
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");
    const [ans, setAns] = useState("");

    const save = (event) => {
        event.preventDefault();
        if (un.length == 0) {
			alert("Email cannot be blank !!!");
            rUn.current.focus();
			return
		}
		if(un.trim().length == 0){
			alert("Mail cannot be empty spaces !!! ");
            rUn.current.focus();
			return
		}
		if (!un.match(/^\S+@\S+\.\S+$/)) {
			alert("Invalid email format");
            rUn.current.focus();
			return;
		}
    
        if ((!pw.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) || (pw.length < 8))) {
            alert("Invalid password format. Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.");
            setPw(""); // Clear the password
            rPw.current.focus(); // Focus on the password input after clearing
            return;
        }
        const auth = getAuth();
        signInWithEmailAndPassword(auth, un, pw)
            .then((res) => {
                localStorage.setItem("un", un);
                nav("/carquill");
            })
            .catch((err) => alert("issue " + err));
    };

    return (
        <>
            <NavBar />
            <div className="login-container">
                <center>
                    <h1 className="login-title">Login Page</h1>
                    <form className="login-form" onSubmit={save}>
                        <input type="email" placeholder="Enter username" onChange={(event) => {setUn(event.target.value);}} ref={rUn}/>
                        <br /> <br />
                        <input type="password" placeholder="Enter password"onChange={(event) => {setPw(event.target.value);}} ref={rPw}/>
                        <br /> <br />
                        <input type="submit" value="Login" className="login-button" />
                        <br /> <br />
                        <Link to="/signup" className="login-signup-link">Don't have an account? Sign up</Link>
                    </form>
                    <h1> {ans} </h1>
                </center>
            </div>
        </>
    );
}
