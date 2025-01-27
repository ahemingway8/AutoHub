import React, { useEffect, useState } from 'react';
import './index.css';

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
            <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Automobiles</h1>
            <div className="row g-4">
                {autos.map(auto => {
                    return (
                        <div className="col-md-4" key={auto.vin}>
                            <div className="card shadow" style={{ width: '100%', borderRadius: '8px' }}>
                                <img
                                    src={auto.model.picture_url}
                                    className="card-img-top"
                                    alt={auto.model.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between">
                                        {auto.model.name}
                                        <span className={`badgle ${auto.sold ? 'bg-danger' : 'bg-success'}`}>
                                            {auto.sold ? 'Sold' : 'Available'}
                                        </span>
                                    </h5>
                                    <p className="card-text">
                                        <strong>VIN:</strong> {auto.vin} <br />
                                        <strong>Color:</strong> {auto.color} <br />
                                        <strong>Year:</strong> {auto.year} <br />
                                        <strong>Manufacturer:</strong> {auto.model.manufacturer.name} <br />
                                        <strong>Sold:</strong> {auto.sold ? 'Yes' : 'No'}
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Model Year: {auto.year}</li>
                                    <li className="list-group-item">Color: {auto.color}</li>
                                    <li className="list-group-item">Manufacturer: {auto.model.manufacturer.name}</li>
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
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
