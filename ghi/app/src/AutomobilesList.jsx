import { useEffect, useState } from 'react';
import './index.css';

function AutomobilesList() {
    const [ autos, setAutos ] = useState([]);
    const [ viewMode, setViewMode ] = useState('cards');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ filterSold, setFilterSold ] = useState('all');

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

    const filteredAutos = autos.filter(auto => {
        const matchesSearch = (
            auto.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            auto.model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            auto.model.manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesSoldFilter = filterSold === 'all' ? true :
            filterSold === "sold" ? auto.sold : !auto.sold;

        return matchesSearch && matchesSoldFilter;
    });

    useEffect(() => {
        fetchAutos();
    }, []);


    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Automobiles</h1>
                <div className="btn-group">
                    <button
                        className={`btn btn-${viewMode === 'cards' ? 'primary' : 'outline-primary'}`}
                        onClick={() => setViewMode('cards')}
                    >
                        <i className="bi bi-grid"></i> Cards
                    </button>
                    <button
                        className={`btn btn-${viewMode === 'table' ? 'primary' : 'outline-primary'}`}
                        onClick={() => setViewMode('table')}
                    >
                        <i className="bi bi-list"></i> Table
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by VIN, model, or manufacturer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={filterSold}
                        onChange={(e) => setFilterSold(e.target.value)}
                    >
                        <option value="all">All Vehicles</option>
                        <option value="available">Available Only</option>
                        <option value="sold">Sold Only</option>
                    </select>
                </div>
            </div>
            {viewMode === 'cards' ? (
               <div className="row g-4">
                    {filteredAutos.map(auto => (
                        <div className="col-md-4" key={auto.vin}>
                            <div className="card h-100 shadow-sm">
                                <div className="position-relative">
                                    <img
                                        src={auto.model.picture_url}
                                        className="card-img-top"
                                        alt={auto.model.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <span className={`position-absolute top-0 end-0 m-2 badge ${auto.sold ? 'bg-danger' : 'bg-success'}`}>
                                        {auto.sold ? 'Sold' : 'Availble'}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{auto.model.name}</h5>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {auto.year} {auto.model.manufacturer.name}
                                        </small>
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-primary">{auto.color}</span>
                                        <small className="text-muted">VIN: {auto.vin}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card border-0">
                    <div className="card-body shadow p-0">
                        <table className="table table-striped table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">VIN</th>
                                    <th className="text-center">Color</th>
                                    <th className="text-center">Year</th>
                                    <th className="text-center">Model</th>
                                    <th className="text-center">Manufacturer</th>
                                    <th className="text-center">Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAutos.map(auto => (

                                        <tr key={ auto.color + auto.vin }>
                                            <td className="text-center">{ auto.vin }</td>
                                            <td className="text-center">{ auto.color }</td>
                                            <td className="text-center">{ auto.year }</td>
                                            <td className="text-center">{ auto.model.name }</td>
                                            <td className="text-center">{ auto.model.manufacturer.name }</td>
                                            <td className="text-center">{ auto.sold ? 'Yes' : 'No' }</td>
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

export default AutomobilesList;
