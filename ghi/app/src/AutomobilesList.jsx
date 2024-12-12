import React, { useEffect, useState } from 'react';


function AutomobilesList() {
    const [autos, setAutos] = useState([]);

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAutos(data.autos);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('fetch error', error);
        }
    };

    useEffect(() => {
        fetchAutos();
    }, []);

    return (
        <div>
            <h1>Automobiles</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map(auto => (

                        <tr key={ auto.color + auto.vin }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                            <td>{ auto.sold ? 'Yes' : 'No' }</td>
                        </tr>
                ))}
            </tbody>
        </table>
        </div>

    );
}

export default AutomobilesList;
