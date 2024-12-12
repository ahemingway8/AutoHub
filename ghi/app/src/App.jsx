import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AutomobilesList from "./AutomobilesList"
import SalespeopleList from "./SalespeopleList";
import ManufacturerList from "./ManufacturerList";
import VehicleModelsList from "./VehicleModelsList";
import CreateModel from "./CreateModel";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="automobiles" element={<AutomobilesList />} />
					<Route path="salespeople" element={<SalespeopleList/>}/>
					<Route path="/manufacturers" element={<ManufacturerList />} />
					<Route path="/vehiclemodels" element={<VehicleModelsList />} />
					<Route path="/createmodel" element={<CreateModel />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
