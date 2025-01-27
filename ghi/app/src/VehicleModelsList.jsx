import { useState, useEffect } from "react";

export default function VehicleModelsList() {
    const [ models, setModels ] = useState([]);

    async function getModels() {
        const url = 'http://localhost:8100/api/models/';
        const res = await fetch(url);
        const { models } = await res.json();
        setModels(models);
    }

    useEffect(() => {getModels()}, []);

    return (
        <>
        <div>
        <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Models</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Picture</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {models.map(model => (
                <tr key={ model.id + model.href }>
                    <td>{ model.name }</td>
                    <td>{ model.manufacturer.name }</td>
                    <td>
                        <img src={ model.picture_url } className="img-thumbnail" width='195' height="195"/>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
}
