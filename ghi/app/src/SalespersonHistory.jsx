import { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [ salespeople, setSalespeople ] = useState([]);
    const [ selectedSalesperson, setSelectedSalesperson ] = useState("");
    const [ sales, setSales ] = useState([]);
    const [ stats, setStats ] = useState(null);

    useEffect(() => {
        const fetchSalespeople = async () => {
            try {
                const response = await fetch('http://localhost:8090/api/salespeople/');
                const data = await response.json();
                setSalespeople(data.salespeople);

            } catch (error) {
                console.error("Error fetching salespeople:", error);
            }
        };
        fetchSalespeople();
    }, []);

    useEffect(() => {
        if (selectedSalesperson) {
            const fetchSalesHistory = async () => {
                try {
                    const response = await fetch(`http://localhost:8090/api/saleshistory/${selectedSalesperson}/`);
                    const data  = await response.json();
                    setSales(data.sales);
                } catch (error) {
                    console.error("Error fetching salesperson's sales:", error);
                }
            };
            fetchSalesHistory();
        }

    }, [selectedSalesperson]);

    useEffect(() => {
        if (selectedSalesperson && sales.length > 0) {
            const totalSales = sales.length;
            const totalValue = sales.reduce((sum, sale) => sum + sale.price, 0);
            const avgValue = totalValue / totalSales;
            setStats({ totalSales, totalValue, avgValue });
        } else {
            setStats(null);
        }
    }, [sales, selectedSalesperson]);

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 mb-4">Salesperson History</h1>
            <div className="row mb-4">
                <div className="col-md-6">
                    <select
                        onChange={handleSalespersonChange}
                        value={selectedSalesperson}
                        name="salesperson"
                        id="salesperson"
                        className="form-select form-select-lg"
                    >
                        <option value="">Choose a salesperson</option>
                        {salespeople.map((salesperson) => (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {selectedSalesperson && stats && (
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <h2>{stats.totalSales}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Value</h5>
                                <h2>${stats.totalValue.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <h5 className="card-title">Average Sales</h5>
                                <h2>${stats.avgValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {sales.length > 0 && (
                <div className="card border-0">
                    <div className="card-body shadow p-0">
                        <table className="table table-striped table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">Customer</th>
                                    <th className="text-center">VIN</th>
                                    <th className="text-center">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => (
                                    <tr key={sale.id}>
                                        <td className="text-center">{sale.customer.first_name} {sale.customer.last_name}</td>
                                        <td className="text-center">{sale.automobile.vin}</td>
                                        <td className="text-center">${sale.price.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalespersonHistory;
