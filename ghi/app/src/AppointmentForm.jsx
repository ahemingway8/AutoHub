import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentForm() {
    const [ formData, setFormData ] = useState({
        date_time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
        status: 'created'
    });
    const [ technicians, setTechnicians ] = useState([]);
    const [ dateInput, setDateInput ] = useState('');
    const [ timeInput, setTimeInput ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTechnicians();
    }, []);

    async function fetchTechnicians() {
        try {
            const res = await fetch('http://localhost:8080/api/technicians/');
            const data = await res.json();
            setTechnicians(data.technicians);
        } catch (error) {
            setError('Failed to load technicians');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('')
    }

    const validateForm = () => {
        if (!dateInput || !timeInput) {
            setError('Please select both date and time');
            return false;
        }
        if (!formData.vin) {
            setError('VIN is required');
            return false;
        }
        if (!formData.customer) {
            setError('Customer name is required');
            return false;
        }
        if (!formData.technician) {
            setError('Please select technician');
            return false;
        }
        if (!formData.reason) {
            setError('Service reason is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) return;

        setLoading(true);
        const dateTime = new Date(`${dateInput}T${timeInput}`).toISOString();

        const data = {
            ...formData,
            date_time: dateTime,
            technician_id: formData.technician,
        };

        try {
            const res = await fetch('http://localhost:8080/api/appointments/', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(data),
            });

            if (res.ok) {
                navigate('/appointments');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to create appointment');
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
                            <h1 className="text-center mb-4">Create Service Appointment</h1>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dateInput}
                                            onChange={(e) => setDateInput(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={timeInput}
                                            onChange={(e) => setTimeInput(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">VIN</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="vin"
                                            value={formData.vin}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter vehicle VIN"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Customer Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="customer"
                                            value={formData.customer}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter customer name"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Technician</label>
                                        <select
                                            className="form-select"
                                            name="technician"
                                            value={formData.technician}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a technician</option>
                                            {technicians.map(tech => (
                                                <option key={tech.id} value={tech.id}>
                                                    {tech.first_name} {tech.last_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Service Reason</label>
                                        <textarea
                                            className="form-control"
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            required
                                            rows="3"
                                            placeholder="Describe the servicee needed"
                                        />
                                    </div>

                                    <div className="d-grd gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Creating...
                                                </>
                                            ) : 'Schedule Appointment'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate('/appointments')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
