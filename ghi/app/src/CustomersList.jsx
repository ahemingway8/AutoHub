import { useEffect, useState, useMemo } from 'react';


function CustomersList() {
    const [ customers, setCustomers ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ sortBy, setSortBy ] = useState({ field: null, direction: 'asc' });
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/customers/');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            } else {
                setError('Error fetching data: ' + response.statusText);
            }
        } catch (error) {
            setError('Network error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const sortedAndFilteredCustomers = useMemo(() => {
        return customers
        .filter(customer =>
            customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone_number.includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if(!sortBy.field) return 0;
            const direction = sortBy.direction === 'asc' ? 1 : -1;
            return a[sortBy.field] > b[sortBy.field] ? direction : -direction;
        });
    }, [customers, searchTerm, sortBy]);


    const handleSort = (field) => {
        setSortBy(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    const columnHeaders = [
        { field: 'first_name', label: 'First Name' },
        { field: 'last_name', label: 'Last Name' },
        { field: 'phone_number', label: 'Phone Number' },
        { field: 'address', label: 'Address' }
    ];

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 mb-3">Customers</h1>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="input-group w-50">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <span className="text-muted">
                            Total Customers: {sortedAndFilteredCustomers.length}
                        </span>
                    </div>
                </div>
            </div>
            <div className="card border-0">
                <div className="card-body shadow p-0">
                    <table className="table table-striped table-bordered mb-0">
                        <thead className="table-light">
                            <tr>
                                {columnHeaders.map(({ field, label }) => (
                                    <th
                                        key={field}
                                        onClick={() => handleSort(field)}
                                        style={{cursor: 'pointer'}}
                                        className="user-select-none text-center"
                                    >
                                        {label}
                                        {sortBy.field === field && (
                                            <i className={`bi bi-arrow-${sortBy.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : sortedAndFilteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No customers found
                                    </td>
                                </tr>
                            ) : (
                                sortedAndFilteredCustomers.map(customer => (
                                    <tr key={ customer.id }>
                                        <td className="text-center">{ customer.first_name }</td>
                                        <td className="text-center">{ customer.last_name }</td>
                                        <td className="text-center">{ customer.phone_number }</td>
                                        <td className="text-center">{ customer.address }</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomersList;
