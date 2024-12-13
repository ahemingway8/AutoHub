import React, { useEffect, useState } from 'react';

function CustomersList() {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/';

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('fetch error', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);


    return (
        <div>
            <h1 style={{ paddingTop: '20px', paddingBottom: '20px'}}>Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={ customer.id }>
                            <td>{ customer.first_name }</td>
                            <td>{ customer.last_name }</td>
                            <td>{ customer.phone_number }</td>
                            <td>{ customer.address }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomersList;
