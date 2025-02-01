import { useState, useEffect } from "react";

export default function ManufacturerList() {
    const [ manufacturers, setManufacturers ] = useState([]);

    async function getManufacturers() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const res = await fetch(url);
        const { manufacturers } = await res.json();
        setManufacturers(manufacturers);
    }

    useEffect(() => {getManufacturers()}, []);

    return (
        <>
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col text-center">
                    <h1 className="display-4 fw-bold">Manufacturers</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="card border-0">
                    <div className="card-body shadow p-0">
                        <table className="table table-striped table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="text-center">Manafacturer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturers.map(manufacturer => (
                                    <tr key={manufacturer.id}>
                                        <td className="text-center py-3">{ manufacturer.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-muted">Total Manufacturers: {manufacturers.length}</p>
                    </div>
                </div>
            </div>


        </div>
        </>
    );
}
