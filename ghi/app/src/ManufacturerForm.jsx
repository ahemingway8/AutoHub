import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    name: ''
}

function ManufacturerForm() {
    const [ formState, setFormState ] = useState(initialFormState);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
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
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8100/api/manufacturers/', {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if (response.ok) {
                setFormState(initialFormState);
                navigate('/manufacturers')
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add manufacturer');
            }
        } catch (error) {
            setError('Network error occurred');
        } finally {
            setLoading(false);
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
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}
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
                                <div className="d-grid">
                                    <button
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2" />Creating...</>
                                        ) : 'Create'}
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

export default ManufacturerForm;
