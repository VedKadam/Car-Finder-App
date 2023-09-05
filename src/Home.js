import NavBar from "./NavBar";
import "./home.css";
import icon from "./icon.png";
import icon2 from "./icon2.png";
import { Link } from "react-router-dom";
export default function Home() {

	return (
		<>
			<NavBar />
			<section className="hero">
				<h1 className="tag-line">CarQuill: Where Your Automotive Journey Takes Flight</h1>

				<p className="subheadline">CarQuill is your ultimate destination for all things automotive. <br/>Whether you're looking for your dream car, seeking detailed information on various models,<br/> or simply exploring the world of automobiles, CarQuill has you covered. <br/>With advanced search and filtering options, finding the perfect vehicle becomes a breeze.<br/> Our platform offers a user-friendly experience, enabling you to tailor your preferences <br/>and discover the ideal match. <br/> Join us today and let your automotive aspirations take flight with CarQuill.</p>
				<Link to="/login" className="cta-button">Get Started</Link>
			</section>

			<section className="features-how-it-works">
				<div className="features">
					<img src={icon} />
					<h2>Key Features</h2>
					<ul className="feature-list">
						<li>Advanced Car Search</li>
						<li>Filtering Options</li>
						<li>Detailed Car Information</li>
						{/* Add more features */}
					</ul>
				</div>

				<div className="how-it-works">
					<img src={icon2} />
					<h2> How It Works</h2>
					<p>1. Enter Your Preferences</p>
					<p>2. Browse Matching Cars</p>
					<p>3. Get Detailed Information</p>
				</div>
			</section>


			<section className="contact">
				<h2>Contact Us</h2>
				<p>Email: testerved52@gmail.com</p>
				<p>Phone: 123-456-7890</p>
				<p>All Rights Reserved by ©Vedant Kadam 2023</p>
			</section>
		</>
	);

}