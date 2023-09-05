import logo from './logo.svg';
import './App.css';
import CarQuill from "./CarQuill";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import About from "./About";
import ChangePassWord from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import NavBar from "./NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
	
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/login" element={<Login/>}/>
			<Route path="/signup" element={<SignUp/>}/>
			<Route path="/about" element={<About/>}/>
			<Route path="/carquill" element={<CarQuill/>}/>
			<Route path="/cp" element={<ChangePassWord/>}/>
			<Route path="/fp" element={<ForgotPassword/>}/>
			<Route path="*" element={<Home/>}/>
		</Routes>
	</BrowserRouter>
    </div>
  );
}

export default App;
