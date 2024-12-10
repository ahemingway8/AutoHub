import React, { useEffect, useState } from 'react';


function AutomobilesList() {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.automobiles);
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
                {automobiles.map((automobile) => {
                    return (
                        <tr key={ automobile.vin }>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model }</td>
                            <td>{ automobile.manufacturer }</td>
                            <td>{ automobile.sold }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );
}

export default AutomobilesList;
