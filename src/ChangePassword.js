import NavBar from "./NavBar";
import app from "./FirebaseConfig";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, updatePassword, onAuthStateChanged} from "firebase/auth";


export default function ChangePassword(){

	const nav = useNavigate();
	const rPw1 = useRef();
	
	useEffect (() => {
		let un = localStorage.getItem("un");
			if(un == null)
			{
				nav("/login");
			}
	
	},[]);
		
	const[pw1, setPw1] = useState("");
	const[pw2, setPw2] = useState("");
	const[ans, setAns] = useState("");

	const save = (event) =>{
		event.preventDefault();
		if (pw1 !== pw2) {
            alert("Passwords do not match");
            rPw1.current.focus();
            return;
        }

        if ((!pw1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) || (pw1.length < 8))) {
            alert("Invalid password format. Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.");
           
            return;
        }
		if(pw1==pw2)
		{
			const auth = getAuth();
			onAuthStateChanged(auth, (user) =>{
			updatePassword(user, pw1)
			.then(res => {
				localStorage.clear();
				alert("Password Changed Successfully !")		
				nav("/login");
			})
			.catch(err => setAns("issue " + err));
			
			})
		}
		else
		{
			setAns("password does not match");
		}
	}
	
	return(
	<>
	<NavBar/>
	<div className="login-container">
	<center>
		<h1 className="login-title"> Change Password</h1>
		<form className="login-form" onSubmit={save}>
		<input type="password" placeholder="enter new password" onChange={(event) => {setPw1(event.target.value);}} ref={rPw1} />
		<br/>	<br/>
		<input type="password" placeholder="enter new password again" onChange={(event) => {setPw2(event.target.value);}}/>
		<br/>	<br/>
		<input type="submit" value="Chang Password" className="login-button" />
		</form>
		<h1> {ans} </h1>
	</center>
	</div>
	</>
	);

}