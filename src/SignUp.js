import NavBar from "./NavBar";
import { useState, useEffect, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import app from "./FirebaseConfig";

export default function SignUp() {
    const nav = useNavigate();
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/");
        }
    }, []);

    const rUn = useRef();
    const rPw1 = useRef();
    const rPw2 = useRef();
    const [un, setUn] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [ans, setAns] = useState("");

    const save = async (event) => {
        event.preventDefault();
        if (un.length === 0) {
            alert("Email cannot be blank !!!");
            rUn.current.focus();
            return;
        }
        if (un.trim().length === 0) {
            alert("Mail cannot be empty spaces !!! ");
            rUn.current.focus();
            return;
        }
        if (!un.match(/^\S+@\S+\.\S+$/)) {
            alert("Invalid email format");
            rUn.current.focus();
            return;
        }

        const auth = getAuth();

        // Check if the email already exists
        try {
            const methods = await fetchSignInMethodsForEmail(auth, un);
            if (methods.length > 0) {
                alert("Email already exists. Please use a different email.");
                rUn.current.focus();
                return;
            }
        } catch (error) {
            console.error("Error fetching sign-in methods:", error);
            setAns("An error occurred. Please try again.");
            return;
        }

        if (pw1 !== pw2) {
            alert("Passwords do not match");
            rPw1.current.focus();
            return;
        }

        if (!pw1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) || pw1.length < 8) {
            alert("Invalid password format. Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.");
            rUn.current.focus();
            return;
        }

        createUserWithEmailAndPassword(auth, un, pw1)
            .then((res) => nav("/login"))
            .catch((err) => alert("issue " + err));
    };

    return (
        <>
            <NavBar />
            <center>
                <h1 className="login-title"> SignUp Page</h1>
                <form className="login-form" onSubmit={save}>
                    <input type="email" placeholder="Enter email" onChange={(event) => { setUn(event.target.value); }} ref={rUn} />
                    <br /> <br />
                    <input type="password" placeholder="Enter password" onChange={(event) => { setPw1(event.target.value); }} ref={rPw1} />
                    <br /> <br />
                    <input type="password" placeholder="Enter password again" onChange={(event) => { setPw2(event.target.value); }} ref={rPw2} />
                    <br /> <br />
                    <input type="submit" className="login-button" value="SignUp" />
                </form>
                <h1> {ans} </h1>
            </center>
        </>
    );
}
