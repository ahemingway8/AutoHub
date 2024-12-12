import React, { useState } from 'react';
import { useNavigate } from 'reacto-router-dom';

const initialFormState = {
    name: ''
}

function ManufacturerForm() {
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
        const url = 'http://localhost:8100/api/manufacturer/'
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
                navigate('/manufacturers')
            } else {
                console.error('Failed to add manufacturer');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px'}}>Create a Manufacturer</h1>
            <form onSubit={handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.name}
                        placeholder="Manufacturer Name"
                        required
                        type="text"
                        name="name"
                        className="form-control"
                    />
                    <label htmlFor="name">Manufacturer Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    );
}

export default ManufacturerForm;
