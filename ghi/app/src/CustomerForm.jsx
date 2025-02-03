import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialFormState = {
    first_name: '',
    last_name: '',
    phone_number: '',
    address: ''
};

function CustomerForm() {
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
            const response = await fetch('http://localhost:8090/api/customers/', {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: {
                'Content-type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/customers')
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add customer');
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
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Add a Customer</h1>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                onChange={handleInputChange}
                                                value={formState.first_name}
                                                placeholder="First Name"
                                                required
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className="form-control"
                                            />
                                            <label htmlFor="first_name">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                onChange={handleInputChange}
                                                value={formState.last_name}
                                                placeholder="Last Name"
                                                required
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className="form-control"
                                            />
                                            <label htmlFor="last_name">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                onChange={handleInputChange}
                                                value={formState.phone_number}
                                                placeholder="Phone Number"
                                                required
                                                type="text"
                                                id="phone_number"
                                                name="phone_number"
                                                className="form-control"
                                            />
                                            <label htmlFor="phone_number">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                onChange={handleInputChange}
                                                value={formState.address}
                                                placeholder="Address"
                                                required
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                style={{height: '100px'}}
                                            />
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                Creating...
                                            </>
                                        ) : 'Create Customer'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/customers')}
                                    >
                                        Cancel
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

export default CustomerForm
