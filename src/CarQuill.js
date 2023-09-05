import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./car.css";

export default function CarQuill() {
	const nav = useNavigate();
	const [un, setUn] = useState("");
	const [cars, setCars] = useState([]);
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [fuelType, setFuelType] = useState([]);
	const [drive, setDrive] = useState([]);
	const [cylinders, setCylinders] = useState([]);
	const [transmission, setTransmission] = useState([]);
	const [year, setYear] = useState("");
	const [minCityMpg, setMinCityMpg] = useState("");
	const [maxCityMpg, setMaxCityMpg] = useState("");
	const [minHwyMpg, setMinHwyMpg] = useState("");
	const [maxHwyMpg, setMaxHwyMpg] = useState("");
	const [minCombMpg, setMinCombMpg] = useState("");
	const [maxCombMpg, setMaxCombMpg] = useState("");
	const [searched, setSearched] = useState(false);


	useEffect(() => {
		let un = localStorage.getItem("un");
		if (un == null) {
			nav("/login");
		}
		else {
			setUn(un);
		}
	}, []);


	const check = (event) => {
		event.preventDefault();
	
		let baseUrl = `https://api.api-ninjas.com/v1/cars`;
		let queryParams = new URLSearchParams({
			make: make,
			model: model,
			fuel_type: fuelType.join(),
			drive: drive.join(),
			cylinders: cylinders.join(),
			transmission: transmission.join(),
			year: year,
			min_city_mpg: minCityMpg,
			max_city_mpg: maxCityMpg,
			min_hwy_mpg: minHwyMpg,
			max_hwy_mpg: maxHwyMpg,
			min_comb_mpg: minCombMpg,
			max_comb_mpg: maxCombMpg
		});
		let url = `${baseUrl}?${queryParams}`;
		let headers = {
			'X-Api-Key': 'caRiUSR3LhYwZrNkiC89Bg==MlVIcZF7ADB2Bdr0'
		};

		axios.get(url, { headers })
			.then(res => {
				setCars(res.data);
				setSearched(true);
			})
			.catch(err => {
				alert("Error fetching data:", err);
				setCars([]);
				setSearched(true);
			});
	}

	const defaultImages = {
		toyota: require("./toyota.jpg"),
		honda: require("./honda.jpg"),
		bmw: require("./bmw.png"),
		audi: require("./audi.jpg"),
		volkswagen: require("./vw.jpg"),
		subaru: require("./subaru.png"),
		ford: require("./ford.png"),
		lamborghini: require("./lmb.jpg"),
		hyundai: require("./hyundai.png"),
		suzuki: require("./suzuki.png"),
		gmc: require("./gmc.png"),
		chevrolet: require("./chevy.png"),
		nissan: require("./nissan.png"),
		porsche: require("./porsche.jpg"),
		kia: require("./kia.jpg"),
		ferrari: require("./ferrari.jpg"),
		jeep: require("./jeep.png"),
		tesla: require("./tesla.png"),
		lexus: require("./lexus.png"),
		bugatti: require("./bugatti.png"),
		volvo: require("./volvo.jpg"),
		jaguar: require("./jaguar.png"),
		maybach: require("./maybach.png"),
		// Add more car makers and their default image URLs as needed
	};


	return (
		<>
			<NavBar />
			<center>
				<h1 className="tit">CarQuill</h1>
				<p id="em">Currently Logged in As: {un}</p>
				<form onSubmit={check}>
					<div className="search">
						<input type="text" placeholder="Search Make" value={make} onChange={(event) => setMake(event.target.value)} required minLength="2" maxLength="50" pattern="^[A-Za-z\s]+$" />
						<input type="text" placeholder="Search Model" value={model} onChange={(event) => setModel(event.target.value)} />
						<input type="submit" value="Search" />
					</div>
					<br /><br />
					<div className="container">
						<div className="fuel">
							<label>Fuel Type:</label>
							<br />
							<input type="checkbox" value="gas" onChange={(event) => setFuelType([...fuelType, event.target.value])} /> Gas
							<br />
							<input type="checkbox" value="diesel" onChange={(event) => setFuelType([...fuelType, event.target.value])} /> Diesel
							<br />
							<input type="checkbox" value="electricity" onChange={(event) => setFuelType([...fuelType, event.target.value])} /> Electric
						</div>
						<br /><br />
						<div className="gear">
							<label>Drive:</label>
							<br />
							<input type="checkbox" value="fwd" onChange={(event) => setDrive([...drive, event.target.value])} /> FWD
							<br />
							<input type="checkbox" value="rwd" onChange={(event) => setDrive([...drive, event.target.value])} /> RWD
							<br />
							<input type="checkbox" value="awd" onChange={(event) => setDrive([...drive, event.target.value])} /> AWD
							<br />
							<input type="checkbox" value="4wd" onChange={(event) => setDrive([...drive, event.target.value])} /> 4WD

						</div>
						<br /><br />
						<div className="cylinders">
							<label>Cylinders:</label>
							<br />
							<input type="checkbox" value="3" onChange={(event) => setCylinders([...cylinders, event.target.value])} /> 3
							<br />
							<input type="checkbox" value="4" onChange={(event) => setCylinders([...cylinders, event.target.value])} /> 4
							<br />
							<input type="checkbox" value="6" onChange={(event) => setCylinders([...cylinders, event.target.value])} /> 6
							<br />
							<input type="checkbox" value="8" onChange={(event) => setCylinders([...cylinders, event.target.value])} /> 8
							<br />
							<input type="checkbox" value="12" onChange={(event) => setCylinders([...cylinders, event.target.value])} /> 12
						</div>
					</div>



				</form>
				<div className="car-grid">
					{searched && cars.length > 0 ? (
						cars.map(car => (
							<div className="car-card" key={car.id}>
								<img src={defaultImages[car.make.toLowerCase()]} alt={`${car.make} ${car.model}`} />
								<h3>{car.make}</h3>
								<p>Model: {car.model}</p>
								<p>Engine: {car.displacement}</p>
								<p>Transmission: {car.transmission}</p>
								<p>Drive: {car.drive}</p>
								<p>Year: {car.year}</p>
								<p>Cylinders: {car.cylinders}</p>
								<p>Fuel: {car.fuel_type}</p>
								<p>City ARAI: {car.city_mpg}</p>
								<p>Highway ARAI: {car.highway_mpg}</p>
							</div>
						))
					) :  searched && cars.length === 0 ? (
						<p>Car not found</p>
					) : null}
				</div>

				<br />	<br /> <br />	<br />	<br />
			</center>
		</>
	);
}
