import { useEffect, useState } from 'react';

function SalesList() {
    const [ sales, setSales ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ sortConfig, setSortConfig ] = useState({ key: null, direction: 'asc' });
    const [ totalSales, setTotalSales ] = useState(0);

    const fetchSales = async () => {
        const url = 'http://localhost:8090/api/sales/';

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('fetch error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const total = sales.reduce((sum, sale) => sum + sale.price, 0);
        setTotalSales(total);
    }, [sales]);

    useEffect(() => {
        fetchSales();
    }, []);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedSales = sales
        .filter(sale => {
            const searchStr = searchTerm.toLowerCase();
            const customerFullName = `${sale.customer.first_name} ${sale.customer.last_name}`.toLowerCase();
            const salespersonFullName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`.toLowerCase();

            return (
                sale.salesperson.employee_id.toLowerCase().includes(searchStr) ||
                salespersonFullName.includes(searchStr) ||
                customerFullName.includes(searchStr) ||
                sale.automobile.vin.toLowerCase().includes(searchStr)
            );
        })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (sortConfig.key.includes('.')) {
                const keys = sortConfig.key.split('.');
                aVal = keys.reduce((obj, key) => obj[key], a);
                bVal = keys.reduce((obj, key) => obj[key], b);
            }

            return (
                aVal > bVal ? 1 : -1
            ) * (sortConfig.direction === 'asc' ? 1 : -1);
        });

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 mb-3">Sales Records</h1>

                    <div className="row align-items-center mb-4">
                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search sales..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="me-4">
                                <span className="me-2">Total Sales:</span>
                                <span className="fw-bold">{filteredAndSortedSales.length}</span>
                            </div>
                            <div>
                                <span className="me-2">Total Revenue:</span>
                                <span className="fw-bold">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(totalSales)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border-0">
                <div className="card-body shadow p-0">
                    <table className="table table-striped table-bordered mb-0">
                        <thead className="table-light">
                                <tr>
                                <th onClick={() => handleSort('salesperson.employee_id')}>
                                    Employee ID
                                    {sortConfig.key === 'salesperson.employee_id' && (
                                        <i className={`bi bi-arrow-${sortConfig.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleSort('salesperson.last_name')}>Salesperson</th>
                                <th onClick={() => handleSort('customer.last_name')}>Customer</th>
                                <th onClick={() => handleSort('automobile.vin')}>VIN</th>
                                <th onClick={() => handleSort('price')}>Price</th>
                                </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredAndSortedSales.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No sales found
                                    </td>
                                </tr>
                            ) : (
                                filteredAndSortedSales.map(sale => (
                                    <tr key={sale.id}>
                                        <td>{sale.salesperson.employee_id}</td>
                                        <td>
                                            {sale.salesperson.first_name} {sale.salesperson.last_name}
                                        </td>
                                        <td>
                                            {sale.customer.first_name} {sale.customer.last_name}
                                        </td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(sale.price)}
                                        </td>
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

export default SalesList;
