import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import VehicleModelsList from "./VehicleModelsList";
import CreateModel from "./CreateModel";
import AutomobilesList from "./AutomobilesList"
import AutomobileForm from "./AutomobileForm";
import SalespeopleList from "./SalespeopleList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";


function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturerList />} />
					<Route path="/vehiclemodels" element={<VehicleModelsList />} />
					<Route path="/createmodel" element={<CreateModel />} />
					<Route path="automobiles" element={<AutomobilesList />} />
					<Route path="addAutomobile" element={<AutomobileForm/>}/>
					<Route path="salespeople" element={<SalespeopleList/>}/>
					<Route path="addSalesperson" element={<SalespersonForm/>}/>
					<Route path="customers" element={<CustomersList/>}/>
					<Route path="addCustomer" element={<CustomerForm/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
