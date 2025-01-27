import React, { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState("");
    const [sales, setSales] = useState([]);

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


    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

    return (
        <div>
            <h1 style={{ paddingTop: '60px', paddingBottom: '20px'}}>Salesperson History</h1>
            <select
                onChange={handleSalespersonChange}
                value={selectedSalesperson}
                name="salesperson"
                id="salesperson"
                className="form-select"
            >
                <option value="">Choose a salesperson</option>
                {salespeople.map((salesperson) => (
                    <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{`$${ sale.price }`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalespersonHistory;
