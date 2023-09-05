import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import NavBar from "./NavBar";
import "./login.css"; // Import the new CSS file

export default function ForgotPassword() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un !== null) {
            nav("/");
        }
    }, []);

    const [un, setUn] = useState("");
    const [ans, setAns] = useState("");

    const save = (event) => {
        event.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, un)
            .then(res => {
                alert("Check Your Email for Password Reset Link !");
                nav("/login");
            })
            .catch(err => setAns("issue " + err));
    }

    return (
        <>
            <NavBar />
			<div className="login-container">
            <center>
                <h1 className="login-title">Forgot Password Page</h1>
                <form className="login-form" onSubmit={save}>
                    <input type="email" placeholder="Enter registered email" onChange={(event) => { setUn(event.target.value); }} />
                    <br /><br />
                    <input type="submit" value="Reset" className="login-button" />
                </form>
                <h1 className="reset-status">{ans}</h1>
            </center>
			</div>
        </>
    );
}
