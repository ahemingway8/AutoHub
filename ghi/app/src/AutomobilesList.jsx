import React, { useEffect, useState } from 'react';


function AutomobilesList() {
    const [autos, setAutos] = useState([]);

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutos(data.automobiles);
        }
    }

    useEffect(() => {
        fetchAutos();
    }, []);

    return (
        <table className="table table-stribed">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map((auto) => {
                    return (
                        <tr key={ auto.vin }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model }</td>
                            <td>{ auto.manufacturer }</td>
                            <td>{ auto.sold }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );
}

export default AutomobilesList;
