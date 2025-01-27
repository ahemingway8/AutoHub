import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ModelForm() {
    const [ models, setModels ] = useState([])
    const [ name, setName ] = useState('');
    const [ manufacturers, setManufacturers ] = useState([]);
    const [ manufacturer_id, setManufacturer ] = useState('');
    const [ picture_url, setPictureUrl ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchManufacturers() {
            try {
                const res = await fetch('http://localhost:8100/api/manufacturers/');
                const data = await res.json();
                setManufacturers(data.manufacturers);
            } catch (error) {
                console.error(error);
            }
        }

        fetchManufacturers();
    }, []);

    function handleName(e) {
        setName(e.target.value)
    }
    function handleManufacturer(e) {
        setManufacturer(e.target.value)
    }
    function handlePictureUrl(e) {
        setPictureUrl(e.target.value)
    }

    function resetFormState() {
        setName('')
        setManufacturer('')
        setPictureUrl('')
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            manufacturer_id,
            picture_url,
        };

        const url = 'http://localhost:8100/api/models/';
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        };

        const res = await fetch(url, fetchOptions);
        if (res.ok) {
           resetFormState();
           navigate('/vehiclemodels');
        } else {
            console.error("Error creating model.");
        }
    }
    return (
        <>
        <div className="shadow mt-4 p-4">
            <h1 className="text-center" style={{paddingTop: '60px', paddingBottom: '20px'}}>Create a vehicle model</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input className="form-control" placeholder="Model name..." type="text" id="name" name="name" value={ name } onChange={handleName} />
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Picture URL..." type="text" id="picture_url" name="picture_url" value={ picture_url } onChange={handlePictureUrl} />
                </div>
                <div>
                <select className="form-select" id="manufacturer_id" name="manufacturer" value={ manufacturers.id } aria-label="Default select example" onChange={handleManufacturer}>
                    <option value="">Choose a manufacturer...</option>
                    {manufacturers.map((manufacturer) =>
                        <option key={manufacturer.id} value={manufacturer.id}>
                            { manufacturer.name }
                            </option>
                        )}
                </select>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
        </>
    );
}
