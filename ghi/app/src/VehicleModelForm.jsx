import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ModelForm() {
    const [ name, setName ] = useState('');
    const [ manufacturers, setManufacturers ] = useState([]);
    const [ manufacturer_id, setManufacturer ] = useState('');
    const [ picture_url, setPictureUrl ] = useState('');
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError] = useState('');
    const [ preview, setPreview ] = useState('');

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    async function handlePictureUrl(e) {
        const url = e.target.value;
        setPictureUrl(url);
        if (isValidUrl(url)) {
            setPreview(url);
            setError('')
        } else if (url) {
            setError('Please enter a valid URL');
            setPreview('');
        } else {
            setError('');
            setPreview('');
        }
    }

    useEffect(() => {
        async function fetchManufacturers() {
            try {
                const res = await fetch('http://localhost:8100/api/manufacturers/');
                const data = await res.json();
                setManufacturers(data.manufacturers);
            } catch (error) {
                console.error(error);
            }
        }

        fetchManufacturers();
    }, []);

    function handleName(e) {
        setName(e.target.value)
    }
    function handleManufacturer(e) {
        setManufacturer(e.target.value)
    }

    function resetFormState() {
        setName('')
        setManufacturer('')
        setPictureUrl('')
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!name || !manufacturer_id || !picture_url) {
            setError('Please fill in all fields');
            return;
        }

        if (!isValidUrl(picture_url)) {
            setError('Please enter a valid picture URL');
            return;
        }

        setLoading(true);
        setError('')

        try {
            const data = { name, manufacturer_id, picture_url };
            const url = 'http://localhost:8100/api/models/';
            const res = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(data),
            });

            if (res.ok) {
                resetFormState();
                navigate('/vehiclemodels');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Error creating a vehicle model');
            }
        } catch (err) {
            setError('Failed to create a vehicle model. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Create Vehicle Model</h1>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Model Name</label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter model name"
                                        value={name}
                                        onChange={handleName}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Manufacturer</label>
                                    <select
                                        className="form-select"
                                        value={manufacturer_id}
                                        onChange={handleManufacturer}
                                        required
                                    >
                                        <option value="">Select a manufacturer</option>
                                        {manufacturers.map(manufacturer => (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Picture URL</label>
                                    <input
                                        className={`form-control ${error && 'is-invalid'}`}
                                        placeholder="Enter picture URL"
                                        value={picture_url}
                                        onChange={handlePictureUrl}
                                        required
                                    />
                                </div>
                                {preview && (
                                    <div className="mb-3">
                                        <label className="form-label">Preview</label>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Vehicle Model'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
