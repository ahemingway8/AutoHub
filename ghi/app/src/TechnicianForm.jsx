import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechnicianForm() {
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ employee_id, setEmployeeId ] = useState('');
    const navigate = useNavigate();

    function handleFirstName(e) {
        setFirstName(e.target.value)
    }
    function handleLastName(e) {
        setLastName(e.target.value)
    }
    function handleEmployeeId(e) {
        setEmployeeId(e.target.value)
    }

    function resetFormState() {
        setFirstName('')
        setLastName('')
        setEmployeeId('')
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const data = {
            first_name,
            last_name,
            employee_id,
        };

        const url = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        };

        const res = await fetch(url, fetchOptions);
        if (res.ok) {
            resetFormState();
            navigate('/technicians');
        } else {
            console.error("Error creating technician.");
        }
    }
    return (
        <>
        <div className="shadow mt-4 p-4">
            <h1 className="text-center">Add a Technician</h1>
            <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                    <input className="form-control" placeholder="First name..." type="text" id="first_name" name="first_name" value={ first_name } onChange={handleFirstName} />
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Last name..." type="text" id="last_name" name="last_name" value={ last_name } onChange={handleLastName} />
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Employee ID..." type="text" id="employee_id" name="employee_id" value={ employee_id } onChange={handleEmployeeId} />
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
        </>
    );
}
