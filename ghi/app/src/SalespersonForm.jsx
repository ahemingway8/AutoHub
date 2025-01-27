import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialFormState = {
    employee_id: '',
    first_name: '',
    last_name: ''
}


function SalespersonForm() {
    const [formState, setFormState] = useState(initialFormState);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formState),
            headers: {
                'Content-type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                navigate('/salespeople')
            } else {
                console.error('Failed to add salesperson');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <>

            <h1 className="text-center" style={{ paddingTop: '60px', paddingBottom: '20px'}}>Add a Salesperson</h1>
            <form onSubmit={handleSubmit} id="add-salesperson-form">
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.employee_id}
                        placeholder="Employee ID"
                        required
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        className="form-control"
                    />
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.first_name}
                        placeholder="First Name"
                        required type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                    />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.last_name}
                        placeholder="Last Name"
                        required type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                    />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    );
}

export default SalespersonForm;
