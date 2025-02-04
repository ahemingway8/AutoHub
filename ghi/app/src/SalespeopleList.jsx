import { useEffect, useState } from 'react';


function SalespeopleList() {
    const [ salespeople, setSalespeople ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ sortField, setSortField ] = useState('employee_id');
    const [ sortDirection, setSortDirection ] = useState('asc');

    const fetchSalespeople = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');

            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople);
            } else {
                setError('Error fetching data:', response.statusText);
            }
        } catch (error) {
            setError('fetch error', error);
        } finally {
            setLoading(false);
        }
    };

    const sortedSalespeople = [...salespeople].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        return a[sortField] > b[sortField] ? multiplier : -multiplier;
    });

    const filteredSalespeople = sortedSalespeople.filter(person =>
        person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 mb-3">Salespeople</h1>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search salespeople..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
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
                            {filteredSalespeople.map(salesperson => (
                                <tr key={salesperson.id}>
                                    <td>{ salesperson.employee_id }</td>
                                    <td>{ salesperson.first_name }</td>
                                    <td> {salesperson.last_name }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalespeopleList;
