import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AutomobilesList from "./AutomobilesList"
import SalespeopleList from "./SalespeopleList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";


function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="automobiles" element={<AutomobilesList />} />
					<Route path="salespeople" element={<SalespeopleList/>}/>
					<Route path="addSalesperson" element={<SalespersonForm/>}/>
					<Route path="customers" element={<CustomersList/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
