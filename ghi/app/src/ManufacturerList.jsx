import { useState, useEffect } from "react";

export default function ManufacturerList() {
    const [ manufacturers, setManufacturers ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

    useEffect(() => {
        const getManufacturers = async () => {
            try {
                const response = await fetch('http://localhost:8100/api/manufacturers/');
                if (response.ok) {
                    const data = await response.json();
                    setManufacturers(data.manufacturers);
                } else {
                    setError('Failed to fetch manufacturers');
                }
            } catch (error) {
                setError('Network error occurred');
            } finally {
                setLoading(false);
            }
        };

        getManufacturers()
        }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="row mb-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col text-center">
                    <h1 className="display-4 fw-bold">Manufacturers</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="card border-0">
                    <div className="card-body shadow p-0">
                        {manufacturers.length === 0 ? (
                            <div className="text-center p-4">
                                <p className="text-muted">No manufacturers found</p>
                            </div>
                        ) : (
                            <table className="table table-striped table-bordered mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-center">Manafacturer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manufacturers.map(manufacturer => (
                                        <tr key={manufacturer.id}>
                                            <td className="text-center py-3">{ manufacturer.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-muted">Total Manufacturers: {manufacturers.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
