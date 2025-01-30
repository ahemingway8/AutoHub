import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const initialFormState = {
    automobile: '',
    salesperson: '',
    customer: '',
    price: 0
}

function SalesForm() {
    const [ autos, setAutos ] = useState([]);
    const [ salespeople, setSalespeople ] = useState([]);
    const [ customers, setCustomers ] = useState([]);
    const [ formState, setFormState ] = useState(initialFormState);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ selectedAuto, setSelectedAuto ] = useState(null);
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const handleAutoSelect = (vin) => {
        const auto = autos.find(a => a.vin === vin);
        setSelectedAuto(auto);
        handleInputChange({ target: { name: 'automobile', value: vin }});
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autosResponse = await fetch('http://localhost:8100/api/automobiles/');
                const autosData = await autosResponse.json();
                setAutos(autosData.autos.filter(auto => !auto.sold));

                const salespersonResponse = await fetch('http://localhost:8090/api/salespeople/');
                const salespersonData = await salespersonResponse.json();
                setSalespeople(salespersonData.salespeople);

                const customersResponse = await fetch('http://localhost:8090/api/customers/');
                const customersData = await customersResponse.json();
                setCustomers(customersData.customers);
            } catch (error) {
                console.error('Error fetching data');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (parseFloat(formState.price) <= 0) {
            setError('Please enter a valid price');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8090/api/sales/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                navigate('/sales');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create sale');
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
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Record a New Sale</h1>

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Select Vehicle</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => handleAutoSelect(e.target.value)}
                                            value={formState.automobile}
                                            required
                                        >
                                            <option value="">Choose a vehicle...</option>
                                            {autos.map(auto => (
                                                <option key={auto.vin} value={auto.vin}>
                                                    {auto.year} {auto.model.manufacturer.name} {auto.model.name} - {auto.vin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedAuto && (
                                        <div className="col-12">
                                            <div className="card bg-light">
                                                <div className="card-body">
                                                    <h6 className="card-subtitle mb-2 text-muted">Selected Vehicle Details</h6>
                                                    <p className="card-text">
                                                        <strong>Model:</strong> {selectedAuto.model.name}<br />
                                                        <strong>Make:</strong> {selectedAuto.model.manufacturer.name}<br />
                                                        <strong>Year:</strong> {selectedAuto.year}<br />
                                                        <strong>Color:</strong> {selectedAuto.color}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-md-6">
                                        <label className="form-label">Salesperson</label>
                                        <select
                                            onChange={handleInputChange}
                                            value={formState.salesperson}
                                            required
                                            name="salesperson"
                                            className="form-select"
                                        >
                                            <option value="">Select salesperson...</option>
                                            {salespeople.map(salesperson => (
                                                <option key={salesperson.id} value={salesperson.id}>
                                                    {salesperson.first_name} {salesperson.last_name} ({salesperson.employee_id})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Customer</label>
                                        <select
                                            onChange={handleInputChange}
                                            value={formState.customer}
                                            required
                                            name="customer"
                                            className="form-select"
                                        >
                                            <option value="">Select customer...</option>
                                            {customers.map(customer => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.first_name} {customer.last_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Sale Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={formState.price}
                                                name="price"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
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
                                                Processing...
                                            </>
                                        ) : 'Complete Sale'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/sales')}
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

export default SalesForm;
