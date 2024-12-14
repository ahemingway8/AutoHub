import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const initialFormState = {
    automobile: '',
    salesperson: '',
    customer: '',
    price: 0
}

function SalesForm() {
    const [ autos, setAutos ] = useState([]);
    const [ salespeople, setSalespeople ] = useState([]);
    const [ customers, setCustomers ] = useState([]);
    const [ formState, setFormState ] = useState(initialFormState);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autosResponse = await fetch('http://localhost:8100/api/automobiles/');
                const autosData = await autosResponse.json();
                setAutos(autosData.autos.filter(auto => !auto.sold));

                const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
                const salesData = await salesResponse.json();
                setSalespeople(salesData.salespeople);

                const customersResponse = await fetch('http://localhost:8090/api/customers/');
                const customersData = await customersResponse.json();
                setCustomers(customersData.customers);
            } catch (error) {
                console.error('Error fetching data');
            }
        };
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
            'Content-type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, fetchConfig);
        if (response.ok) {

            setFormState(initialFormState);
            navigate('/sales');
        } else {
        console.error('Failed to add sale')
        }
    } catch (error) {
        console.error('Submission error:', error)
    }

    };

    /*const fetchAutos = async() => {
        const url = 'http://localhost:8100/api/automobiles/';
        try {
           const response = await fetch(url);
           if (response.ok) {
                const data = await response.json();
                setAutos(data.autos);
           } else {
                console.error("Error fetching autos")
           }
        } catch (error) {
            console.error('Error fetching automobiles:', error);
        }
    };

    const fetchSalespeople = async() => {
        const url = 'http://localhost:8090/api/salespeople/';
        try {
            const response = await fetch(url);
            if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
            } else {
                console.error("Error fetching salespeople")
            }
        } catch (error) {
            console.error('Error fetching autos:', error);
        }
    };

    const fetchCustomers = async() => {
        const url = 'http://localhost:8090/api/customers/';
        try {
            const response = await fetch(url);
            if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
            } else {
                console.error("Error fetching customers")
            }
        } catch (error) {
            console.error('Error fetching autos:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
            'Content-type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormState(initialFormState);
            fetchAutos();
            navigate('/sales');
        } else {
        console.error('Failed to add sale')
        }
    } catch (error) {
        console.error('Submission error:', error)
    }

    };

    useEffect(() => {
        fetchAutos();
        fetchSalespeople();
        fetchCustomers();
    }, []); */


    return (
        <>
            <h1 className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px'}}>Record a New Sale</h1>
            <form onSubmit={handleSubmit} id="add-sale-form">
                <div className="mb-3">
                    <select
                        onChange={handleInputChange}
                        value={formState.automobile}
                        required
                        name="automobile"
                        id="automobile"
                        className="form-select"
                    >
                        <option value="">Choose an automobile VIN</option>
                        {autos.map(auto => (
                            <option key={auto.vin} value={auto.vin}>
                                {auto.vin}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <select
                        onChange={handleInputChange}
                        value={formState.salesperson}
                        required
                        name="salesperson"
                        id="salesperson"
                        className="form-select"
                    >
                        <option value="">Choose a salesperson</option>
                        {salespeople.map(salesperson => (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <select
                        onChange={handleInputChange}
                        value={formState.customer}
                        required
                        name="customer"
                        id="customer"
                        className="form-select"
                    >
                        <option value="">Choose a customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.first_name} {customer.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInputChange}
                        value={formState.price}
                        placeholder="Price"
                        required
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                    />
                    <label htmlFor="price">Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    );
}

export default SalesForm;
