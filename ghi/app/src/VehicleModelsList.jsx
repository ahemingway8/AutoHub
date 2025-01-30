import { useState, useEffect } from "react";

export default function VehicleModelsList() {
    const [ models, setModels ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ selectedManufacturer, setSelectedManufacturer ] = useState('');
    const [ manufacturers, setManufacturers ] = useState([]);

    async function getModels() {
        const url = 'http://localhost:8100/api/models/';
        const res = await fetch(url);
        const { models } = await res.json();
        setModels(models);

        const uniqueManufaacturers = [...new Set(models.map(model => model.manufacturer.name))];
        setManufacturers(uniqueManufaacturers);
    }

    useEffect(() => {getModels() }, []);

    const filteredModels = models.filter(model => {
        const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesManufacturer = !selectedManufacturer || model.manufacturer.name === selectedManufacturer;
        return matchesSearch && matchesManufacturer;
    });

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Models</h1>
                    <div className="row g-3 mb-4">
                        <div className="row g-3 mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search models..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={selectedManufacturer}
                                onChange={(e) => setSelectedManufacturer(e.target.value)}
                            >
                                <option value="">All Manufacturers</option>
                                {manufacturers.map(manufacturer => (
                                    <option key={manufacturer} value={manufacturer}>
                                        {manufacturer}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className="text-muted mb-3">
                        Showing {filteredModels.length} of {models.length} models
                    </p>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {filteredModels.map(model => (
                            <div key={model.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={model.picture_url}
                                        className="card-img-top"
                                        alt={model.name}
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{model.name}</h5>
                                        <p className="card-text text-muted">
                                        {model.manufacturer.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
