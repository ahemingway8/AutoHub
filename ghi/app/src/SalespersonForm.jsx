import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialFormState = {
    employee_id: '',
    first_name: '',
    last_name: ''
}


function SalespersonForm() {
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
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

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
                const data = await response.json();
                setError(data.message || 'Failed to add salesperson');
            }
        } catch (error) {
            setError('An error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Add a Salesperson</h1>

                            {error && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="needs-validation">
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
                                        required
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="form-control"
                                    />
                                    <label htmlFor="first_name">First Name</label>
                                </div>

                                <div className="form-floating mb-4">
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

                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                 Creating...
                                            </>
                                        ) : (
                                            'Create Salesperson'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/salespeople')}
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

export default SalespersonForm;
