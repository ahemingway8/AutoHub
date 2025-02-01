import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        const url = 'http://localhost:8100/api/manufacturers/'
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
                setFormState(initialFormState);
                navigate('/manufacturers')
            } else {
                console.error('Failed to add manufacturer');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">
                                Create a Manufacturer
                            </h1>
                            <form onSubmit={handleSubmit} id="create-manufacturer-form">
                                <div className="form-floating mb-4">
                                    <input
                                        onChange={handleInputChange}
                                        value={formState.name}
                                        placeholder="Manufacturer Name"
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                    />
                                    <label htmlFor="name">Manufacturer Name</label>
                                </div>
                                <button className="btn btn-primary w-100">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerForm;
