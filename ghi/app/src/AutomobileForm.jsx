import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const initialFormState = {
    color: '',
    year: 0,
    vin: '',
    model: '',

}

function AutomobileForm() {
    const [ models, setModels ] = useState([]);
    const [ formState, setFormState ] = useState(initialFormState);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };


    const fetchData = async() => {
        const url = 'http://localhost:8100/api/models/';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setModels(data.models);
            } else {
                console.error("Error fetching models")
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            ...formState,
            model_id: formState.model,
        };

        try {
            const response = await fetch('http://localhost:8100/api/automobiles/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setFormState(initialFormState);
                navigate('/automobiles');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add automobile');
            }
        } catch (error) {
            setError('An error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Add an Automobile to Inventory</h1>

                            <form onSubmit={handleSubmit} id="add-automobile-form">
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={handleInputChange}
                                        value={formState.color}
                                        placeholder="Color"
                                        required type="text"
                                        id="color"
                                        name="color"
                                        className='form-control'
                                    />
                                    <label htmlFor="color">Color</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={handleInputChange}
                                        value={formState.year}
                                        placeholder="Year"
                                        required type="number"
                                        id="year"
                                        name="year"
                                        className='form-control'
                                    />
                                    <label htmlFor="year">Year</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={handleInputChange}
                                        value={formState.vin}
                                        placeholder="VIN"
                                        required type="text"
                                        id="vin"
                                        name="vin"
                                        className='form-control'
                                    />
                                    <label htmlFor="vin">VIN</label>
                                </div>
                                <div className="mb-3">
                                    <select
                                        onChange={handleInputChange}
                                        value={formState.model}
                                        required
                                        name="model"
                                        id="model"
                                        className="form-select"
                                    >
                                        <option value="">Choose a model</option>
                                        {models.map(model => (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Adding...' : 'Add Automobile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;
