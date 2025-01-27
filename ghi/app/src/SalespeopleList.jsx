import React, { useEffect, useState } from 'react';


function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('fetch error', error);
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);


    return (
        <div>
            <h1 style={{ paddingTop: '60px', paddingBottom: '20px'}}>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => (
                        <tr key={ salesperson.id }>
                            <td>{ salesperson.employee_id }</td>
                            <td>{ salesperson.first_name }</td>
                            <td> {salesperson.last_name }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalespeopleList;
