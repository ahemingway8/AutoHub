import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleModelsList from "./VehicleModelsList";
import VehicleModelForm from "./VehicleModelForm";
import AutomobilesList from "./AutomobilesList"
import AutomobileForm from "./AutomobileForm";
import SalespeopleList from "./SalespeopleList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import ManufacturerForm from "./ManufacturerForm";
import TechnicianList from "./TechnicianList";
import TechnicianForm from "./TechnicianForm";
import AppointmentForm from "./AppointmentForm";
import ManufacturerForm from "./ManufacturerForm";


function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturerList />} />
					<Route path="/createmanufacturers" element={<ManufacturerForm />} />
					<Route path="/vehiclemodels" element={<VehicleModelsList />} />
					<Route path="/createmodel" element={<VehicleModelForm />} />
					<Route path="automobiles" element={<AutomobilesList />} />
					<Route path="addAutomobile" element={<AutomobileForm/>}/>
					<Route path="salespeople" element={<SalespeopleList/>}/>
					<Route path="addSalesperson" element={<SalespersonForm/>}/>
					<Route path="customers" element={<CustomersList/>}/>
					<Route path="addCustomer" element={<CustomerForm/>}/>
					<Route path="/technicians" element={<TechnicianList/>}/>
					<Route path="/addTechnician" element={<TechnicianForm/>} />
					<Route path="/createappointment" element={<AppointmentForm/>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
