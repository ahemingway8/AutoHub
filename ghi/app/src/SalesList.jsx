import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);

    
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
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);


    return (
        <div>
            <h1 style={{ paddingTop: '20px', paddingBottom: '20px'}}>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={ sale.id }>
                            <td>{ sale.salesperson.employee_id }</td>
                            <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                            <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                            <td>{ sale.automobile.vin }</td>
                            <td>{`$${ sale.price }`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
