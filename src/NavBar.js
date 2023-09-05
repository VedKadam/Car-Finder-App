import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./navbar.css";

export default function NavBar() {
    const un = localStorage.getItem("un");
    const nav = useNavigate(); // Initialize the useNavigate hook

    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        nav("/");
    };

    return (
        <div className="nav">
            {(un == null) && (<Link to="/" className="logo-link">CarQuill</Link>)}
            {(un == null) && (<Link to="/login">Login</Link>)}
            {(un == null) && (<Link to="/signup">Sign-Up</Link>)}
            {(un == null) && (<Link to="/fp">Forgot Password</Link>)}
            {(un != null) && (<Link to="/carquill" className="logo-link">CarQuill</Link>)}
            {(un != null) && (<Link to="/cp">Change Password</Link>)}
            {(un != null) && (<button className="logout-button" onClick={logout}>Logout</button>)} {/* Logout Button */}
        </div>
    );
}
