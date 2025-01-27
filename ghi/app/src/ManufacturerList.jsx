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
        <div>
        <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Manufacturers</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {manufacturers.map(manufacturer => (
                <tr key={manufacturer.id}>
                    <td>{ manufacturer.name}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
}
