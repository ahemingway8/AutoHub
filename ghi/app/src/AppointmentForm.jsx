import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentForm() {
    const [ date_time, setDateTime ] = useState('');
    const [ reason, setReason ] = useState('');
    const [ vin, setVin ] = useState('');
    const [ customer, setCustomer ] = useState('');
    const [ technicians, setTechnicians ] = useState([]);
    const [ technician, setTechnician ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTechnicians() {
            try {
                const res = await fetch('http://localhost:8080/api/technicians/');
                const data = await res.json();
                setTechnicians(data.technicians);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTechnicians();
    }, []);

    function handleReason(e) {
        setReason(e.target.value)
    }
    function handleVin(e) {
        setVin(e.target.value)
    }
    function handleCustomer(e) {
        setCustomer(e.target.value)
    }
    function handleTechnician(e) {
        setTechnician(e.target.value)
    }

    function resetFormState() {
        setDateTime('')
        setReason('')
        setVin('')
        setCustomer('')
        setTechnicians('')
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const data = {
            date_time,
            reason,
            vin,
            customer,
            technician,
        };

        const url = "http://localhost:8080/api/appointments/";
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        };

        const res = await fetch(url, fetchOptions);
        if (res.ok) {
            resetFormState();
            navigate('/serviceappointments');
        } else {
            console.error("Error creating appointment.");
        }
    }
    return (
        <>
        <div className="shadow mt-4 p-4">
            <h1 className="text">Create a service appointment</h1>
            <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="vin" className="form-label">Automobile VIN</label>
                <input type="text" className="form-control" id="vin" name="vin" value={ vin } onChange={handleVin} />
            </div>
            <div className="form-group">
                <label htmlFor="customer" className="form-label">Customer</label>
                <input type="text" className="form-control" id="customer" name="customer" onChange={handleCustomer} value={ customer } />
            </div>
            <div className="form-group">
                <input className="form-control" type="date" value={date_time.split('T')[0] || ""} onChange={(e) => { const timePart = date_time.split('T')[1] || "00:00"; setDateTime(e.target.value + 'T' + timePart); }} required/>
            </div>
            <div>
                <input className="form-control" type="time" value={date_time.split('T')[1] || ""} onChange={(e) => { const datePart = date_time.split('T')[0] || "1970-01-01"; setDateTime(datePart + 'T' + e.target.value); }} required/>
            </div>
            <div>
                <select className="form-select" id="technicians" name="technicians" value={ technician } aria-label="Default select example" onChange={handleTechnician}>
                    <option value="">Choose a technician...</option>
                    {technicians.map((technician) =>
                        <option key={technician.id} value={technician.id}>
                            { technician.first_name } { technician.last_name }
                            </option>
                        )}
                </select>
                </div>
            <div className="form-group">
                <label htmlFor="reason" className="form-label">Reason</label>
                <input type="text" className="form-control" id="reason" name="reason" value={ reason } onChange={handleReason} />
            </div>
            <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
        </>
    );
}
