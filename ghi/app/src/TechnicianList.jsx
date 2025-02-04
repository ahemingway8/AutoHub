import { useState, useEffect } from "react";

export default function TechnicianList() {
    const [ technicians, setTechnicians ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ sortField, setSortField ] = useState('employee_id');
    const [ sortDirection, setSortDirection ] = useState('asc');

    async function getTechnicians() {
        try {
            const res = await fetch('http://localhost:8080/api/technicians/');
            const data = await res.json();
            setTechnicians(data.technicians);
        } catch (error) {
            console.error('Error fetching technicians:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTechnicians();
    }, []);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredTechnicians = technicians
        .filter(tech =>
            tech.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tech.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tech.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const direction = sortDirection === 'asc' ? 1 : -1;
            return a[sortField] > b[sortField] ? direction : -direction;
        });

    return (
        <div className="contrainer mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="mb-4">Technicians</h1>

                    <div className="row align-items-center mb-4">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search technicians..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="mb-0 text-muted">
                                Total Technicians: {filteredTechnicians.length}
                            </p>
                        </div>
                    </div>

                    <div className="card border-0">
                        <div className="card-body shadow p-0">
                            <table className="table table-striped table-bordered mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th onClick={() => handleSort('employee_id')} style={{cursor: 'pointer'}}>
                                            Employee ID {sortField === 'employee_id' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th onClick={() => handleSort('first_name')} style={{cursor: 'pointer'}}>
                                            First Name {sortField === 'first_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th onClick={() => handleSort('last_name')} style={{cursor: 'pointer'}}>
                                            Last Name {sortField === 'last_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredTechnicians.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">
                                                No technicians found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTechnicians.map(technician => (
                                            <tr key={technician.id}>
                                                <td>{technician.employee_id}</td>
                                                <td>{ technician.first_name }</td>
                                                <td>{ technician.last_name }</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
