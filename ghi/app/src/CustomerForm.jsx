import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const initialFormState = {
    first_name: '',
    last_name: '',
    phone_number: '',
    address: ''
}


function CustomerForm() {
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
        const url = 'http://localhost:8090/api/customers/'
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
                navigate('/customers')
            } else {
                console.error('Failed to add customer');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };


    return (
        <>
            <h1 className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px'}}>Add a Customer</h1>
            <form onSubmit={handleSubmit} id="add-customer-form">
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.first_name}
                        placeholder="First Name"
                        required type="text"
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
                        name="last_name"
                        className="form-control"
                    />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.phone_number}
                        placeholder="Phone Number"
                        required type="text"
                        name="phone_number"
                        className="form-control"
                    />
                    <label htmlFor="phone_number">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        onChange={handleInputChange}
                        value={formState.address}
                        placeholder="Address"
                        required
                        name="address"
                        className="form-control"
                    />
                    <label htmlFor="address">Address</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    );
}

export default CustomerForm
