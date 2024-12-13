import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModelForm() {
    const [ models, setModels ] = useState([])

    const [ model_name, setModelName ] = useState('')
    const [ manufacturer, setManufacturer ] = useState('')
    const [ picture_url, setPictureUrl ] = useState('')
    const navigate = useNavigate();

    function handleModelName(e) {
        setModelName(e.target.value)
    }
    function handleManufacturer(e) {
        setManufacturer(e.target.value)
    }
    function handlePictureUrl(e) {
        setPictureUrl(e.target.value)
    }

    function resetForm() {
        setModelName('')
        setManufacturer('')
        setPictureUrl('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            model_name: models.model_name,
            manufacturer: models.manufacturer.name,
            picture_url: models.picture_url,
        };

        const url = 'http://localhost:8100/api/models';
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        });

        if (res.ok) {
           resetForm();
           navigate('/models');
        } else (res.status === 400); {
            console.error("Error creating model.");
        }
    }
    return (
        <>
        <div className=" p-4">
            <h1 className="text-center">Create a vehicle model</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="form-control" placeholder="Model name..." type="text" id="model_name" name="model_name" value={ models.model_name } onChange={handleModelName} />
                </div>
                {/* <div className="form-group">
                    <input className="form-control" placeholder="Picture URL..." type="text" id="picture_url" name="picture_url" value={ models.picture_url } onChange={handlePictureUrl} />
                </div>
                <div>
                <select className="form-select" id="manufacturer" name="manufacturer" value={ models.manufacturer.name } aria-label="Default select example" onChange={handleManufacturer}>
                    <option selected>Choose a manufacturer...</option>
                    {manufacturers.map((manufacturer) =>
                        <option key={manufacturer.id + manufacturer.href} value={manufacturer.id + manufacturer.href}>
                            </option>
                        )}
                </select>
                </div> */}
            </form>
        </div>
        </>
    );
}
