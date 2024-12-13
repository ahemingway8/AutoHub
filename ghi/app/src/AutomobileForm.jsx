import React, {useEffect, useState } from 'react';
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
        const url = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-type': 'application/json',
            },
        };

        try{
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setFormState(initialFormState);
                navigate('/automobiles');
            } else {
                console.error('Failed to add automobile');
            }
        } catch (error) {
            console.error('Submission error:', error)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <>
            <h1 className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px'}}>Add an Automobile to Inventory</h1>
            <form onSubmit={handleSubmit} id="add-automobile-form">
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.color}
                        placeholder="Color"
                        required type="text"
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
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    );
}

export default AutomobileForm;
